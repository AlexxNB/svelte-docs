var app = (function (exports) {
  'use strict';

  let raf = null;
  function requestAnimationFrame$1 (callback) {
    if (!raf) {
      raf = (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
          return setTimeout(callback, 16)
        }
      ).bind(window);
    }
    return raf(callback)
  }

  let caf = null;
  function cancelAnimationFrame (id) {
    if (!caf) {
      caf = (
        window.cancelAnimationFrame ||
        window.webkitCancelAnimationFrame ||
        window.mozCancelAnimationFrame ||
        function (id) {
          clearTimeout(id);
        }
      ).bind(window);
    }

    caf(id);
  }

  function createStyles (styleText) {
    var style = document.createElement('style');
    style.type = 'text/css';

    if (style.styleSheet) {
      style.styleSheet.cssText = styleText;
    } else {
      style.appendChild(document.createTextNode(styleText));
    }
    (document.querySelector('head') || document.body).appendChild(style);
    return style
  }

  function createElement (tagName, props = {}) {
    let elem = document.createElement(tagName);
    Object.keys(props).forEach(key => {
      elem[key] = props[key];
    });
    return elem
  }

  function getComputedStyle$1 (elem, prop, pseudo) {
    // for older versions of Firefox, `getComputedStyle` required
    // the second argument and may return `null` for some elements
    // when `display: none`
    let computedStyle = window.getComputedStyle(elem, pseudo || null) || {
      display: 'none'
    };

    return computedStyle[prop]
  }

  function getRenderInfo (elem) {
    if (!document.documentElement.contains(elem)) {
      return {
        detached: true,
        rendered: false
      }
    }

    let current = elem;
    while (current !== document) {
      if (getComputedStyle$1(current, 'display') === 'none') {
        return {
          detached: false,
          rendered: false
        }
      }
      current = current.parentNode;
    }

    return {
      detached: false,
      rendered: true
    }
  }

  var css = ".resize-triggers{visibility:hidden;opacity:0}.resize-contract-trigger,.resize-contract-trigger:before,.resize-expand-trigger,.resize-triggers{content:\"\";position:absolute;top:0;left:0;height:100%;width:100%;overflow:hidden}.resize-contract-trigger,.resize-expand-trigger{background:#eee;overflow:auto}.resize-contract-trigger:before{width:200%;height:200%}";

  let total = 0;
  let style = null;

  function addListener (elem, callback) {
    if (!elem.__resize_mutation_handler__) {
      elem.__resize_mutation_handler__ = handleMutation.bind(elem);
    }

    let listeners = elem.__resize_listeners__;

    if (!listeners) {
      elem.__resize_listeners__ = [];
      if (window.ResizeObserver) {
        let { offsetWidth, offsetHeight } = elem;
        let ro = new ResizeObserver(() => {
          if (!elem.__resize_observer_triggered__) {
            elem.__resize_observer_triggered__ = true;
            if (elem.offsetWidth === offsetWidth && elem.offsetHeight === offsetHeight) {
              return
            }
          }
          runCallbacks(elem);
        });

        // initially display none won't trigger ResizeObserver callback
        let { detached, rendered } = getRenderInfo(elem);
        elem.__resize_observer_triggered__ = detached === false && rendered === false;
        elem.__resize_observer__ = ro;
        ro.observe(elem);
      } else if (elem.attachEvent && elem.addEventListener) {
        // targeting IE9/10
        elem.__resize_legacy_resize_handler__ = function handleLegacyResize () {
          runCallbacks(elem);
        };
        elem.attachEvent('onresize', elem.__resize_legacy_resize_handler__);
        document.addEventListener('DOMSubtreeModified', elem.__resize_mutation_handler__);
      } else {
        if (!total) {
          style = createStyles(css);
        }
        initTriggers(elem);

        elem.__resize_rendered__ = getRenderInfo(elem).rendered;
        if (window.MutationObserver) {
          let mo = new MutationObserver(elem.__resize_mutation_handler__);
          mo.observe(document, {
            attributes: true,
            childList: true,
            characterData: true,
            subtree: true
          });
          elem.__resize_mutation_observer__ = mo;
        }
      }
    }

    elem.__resize_listeners__.push(callback);
    total++;
  }

  function getUpdatedSize (elem) {
    let { width, height } = elem.__resize_last__;
    let { offsetWidth, offsetHeight } = elem;
    if (offsetWidth !== width || offsetHeight !== height) {
      return {
        width: offsetWidth,
        height: offsetHeight
      }
    }
    return null
  }

  function handleMutation () {
    // `this` denotes the scrolling element
    let { rendered, detached } = getRenderInfo(this);
    if (rendered !== this.__resize_rendered__) {
      if (!detached && this.__resize_triggers__) {
        resetTriggers(this);
        this.addEventListener('scroll', handleScroll, true);
      }
      this.__resize_rendered__ = rendered;
      runCallbacks(this);
    }
  }

  function handleScroll () {
    // `this` denotes the scrolling element
    resetTriggers(this);
    if (this.__resize_raf__) {
      cancelAnimationFrame(this.__resize_raf__);
    }
    this.__resize_raf__ = requestAnimationFrame$1(() => {
      let updated = getUpdatedSize(this);
      if (updated) {
        this.__resize_last__ = updated;
        runCallbacks(this);
      }
    });
  }

  function runCallbacks (elem) {
    if (!elem || !elem.__resize_listeners__) {
      return
    }
    elem.__resize_listeners__.forEach(callback => {
      callback.call(elem);
    });
  }

  function initTriggers (elem) {
    let position = getComputedStyle$1(elem, 'position');
    if (!position || position === 'static') {
      elem.style.position = 'relative';
    }

    elem.__resize_old_position__ = position;
    elem.__resize_last__ = {};

    let triggers = createElement('div', {
      className: 'resize-triggers'
    });
    let expand = createElement('div', {
      className: 'resize-expand-trigger'
    });
    let expandChild = createElement('div');
    let contract = createElement('div', {
      className: 'resize-contract-trigger'
    });
    expand.appendChild(expandChild);
    triggers.appendChild(expand);
    triggers.appendChild(contract);
    elem.appendChild(triggers);

    elem.__resize_triggers__ = {
      triggers,
      expand,
      expandChild,
      contract
    };

    resetTriggers(elem);
    elem.addEventListener('scroll', handleScroll, true);

    elem.__resize_last__ = {
      width: elem.offsetWidth,
      height: elem.offsetHeight
    };
  }

  function resetTriggers (elem) {
    let { expand, expandChild, contract } = elem.__resize_triggers__;

    // batch read
    let { scrollWidth: csw, scrollHeight: csh } = contract;
    let { offsetWidth: eow, offsetHeight: eoh, scrollWidth: esw, scrollHeight: esh } = expand;

    // batch write
    contract.scrollLeft = csw;
    contract.scrollTop = csh;
    expandChild.style.width = eow + 1 + 'px';
    expandChild.style.height = eoh + 1 + 'px';
    expand.scrollLeft = esw;
    expand.scrollTop = esh;
  }

  let iframe_id = 0;

  function getHeight(){
      return document.documentElement.offsetHeight
  }

  window.addEventListener('message', function (event) {
      if (event.data.hasOwnProperty("COMPONENT")) {
          const Example = app[event.data.COMPONENT];
          iframe_id = event.data.iframe_id;
   

          addListener(document.body, (e)=>{
              event.source.postMessage({ 'HEIGHT': getHeight(), iframe_id }, "*");
          });

          new Example({
              target: document.body,
              props: {}
          });    
      }
  });

  function noop() { }
  const identity = x => x;
  function run(fn) {
      return fn();
  }
  function blank_object() {
      return Object.create(null);
  }
  function run_all(fns) {
      fns.forEach(run);
  }
  function is_function(thing) {
      return typeof thing === 'function';
  }
  function safe_not_equal(a, b) {
      return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
  }

  const is_client = typeof window !== 'undefined';
  let now = is_client
      ? () => window.performance.now()
      : () => Date.now();
  let raf$1 = is_client ? cb => requestAnimationFrame(cb) : noop;

  const tasks = new Set();
  let running = false;
  function run_tasks() {
      tasks.forEach(task => {
          if (!task[0](now())) {
              tasks.delete(task);
              task[1]();
          }
      });
      running = tasks.size > 0;
      if (running)
          raf$1(run_tasks);
  }
  function loop(fn) {
      let task;
      if (!running) {
          running = true;
          raf$1(run_tasks);
      }
      return {
          promise: new Promise(fulfil => {
              tasks.add(task = [fn, fulfil]);
          }),
          abort() {
              tasks.delete(task);
          }
      };
  }

  function append(target, node) {
      target.appendChild(node);
  }
  function insert(target, node, anchor) {
      target.insertBefore(node, anchor || null);
  }
  function detach(node) {
      node.parentNode.removeChild(node);
  }
  function element(name) {
      return document.createElement(name);
  }
  function text(data) {
      return document.createTextNode(data);
  }
  function space() {
      return text(' ');
  }
  function empty() {
      return text('');
  }
  function listen(node, event, handler, options) {
      node.addEventListener(event, handler, options);
      return () => node.removeEventListener(event, handler, options);
  }
  function attr(node, attribute, value) {
      if (value == null)
          node.removeAttribute(attribute);
      else
          node.setAttribute(attribute, value);
  }
  function children(element) {
      return Array.from(element.childNodes);
  }
  function custom_event(type, detail) {
      const e = document.createEvent('CustomEvent');
      e.initCustomEvent(type, false, false, detail);
      return e;
  }

  let stylesheet;
  let active = 0;
  let current_rules = {};
  // https://github.com/darkskyapp/string-hash/blob/master/index.js
  function hash(str) {
      let hash = 5381;
      let i = str.length;
      while (i--)
          hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
      return hash >>> 0;
  }
  function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
      const step = 16.666 / duration;
      let keyframes = '{\n';
      for (let p = 0; p <= 1; p += step) {
          const t = a + (b - a) * ease(p);
          keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
      }
      const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
      const name = `__svelte_${hash(rule)}_${uid}`;
      if (!current_rules[name]) {
          if (!stylesheet) {
              const style = element('style');
              document.head.appendChild(style);
              stylesheet = style.sheet;
          }
          current_rules[name] = true;
          stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
      }
      const animation = node.style.animation || '';
      node.style.animation = `${animation ? `${animation}, ` : ``}${name} ${duration}ms linear ${delay}ms 1 both`;
      active += 1;
      return name;
  }
  function delete_rule(node, name) {
      node.style.animation = (node.style.animation || '')
          .split(', ')
          .filter(name
          ? anim => anim.indexOf(name) < 0 // remove specific animation
          : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
      )
          .join(', ');
      if (name && !--active)
          clear_rules();
  }
  function clear_rules() {
      raf$1(() => {
          if (active)
              return;
          let i = stylesheet.cssRules.length;
          while (i--)
              stylesheet.deleteRule(i);
          current_rules = {};
      });
  }

  let current_component;
  function set_current_component(component) {
      current_component = component;
  }

  const dirty_components = [];
  const binding_callbacks = [];
  const render_callbacks = [];
  const flush_callbacks = [];
  const resolved_promise = Promise.resolve();
  let update_scheduled = false;
  function schedule_update() {
      if (!update_scheduled) {
          update_scheduled = true;
          resolved_promise.then(flush);
      }
  }
  function add_render_callback(fn) {
      render_callbacks.push(fn);
  }
  function flush() {
      const seen_callbacks = new Set();
      do {
          // first, call beforeUpdate functions
          // and update components
          while (dirty_components.length) {
              const component = dirty_components.shift();
              set_current_component(component);
              update(component.$$);
          }
          while (binding_callbacks.length)
              binding_callbacks.pop()();
          // then, once components are updated, call
          // afterUpdate functions. This may cause
          // subsequent updates...
          for (let i = 0; i < render_callbacks.length; i += 1) {
              const callback = render_callbacks[i];
              if (!seen_callbacks.has(callback)) {
                  callback();
                  // ...so guard against infinite loops
                  seen_callbacks.add(callback);
              }
          }
          render_callbacks.length = 0;
      } while (dirty_components.length);
      while (flush_callbacks.length) {
          flush_callbacks.pop()();
      }
      update_scheduled = false;
  }
  function update($$) {
      if ($$.fragment) {
          $$.update($$.dirty);
          run_all($$.before_update);
          $$.fragment.p($$.dirty, $$.ctx);
          $$.dirty = null;
          $$.after_update.forEach(add_render_callback);
      }
  }

  let promise;
  function wait() {
      if (!promise) {
          promise = Promise.resolve();
          promise.then(() => {
              promise = null;
          });
      }
      return promise;
  }
  function dispatch(node, direction, kind) {
      node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
  }
  const outroing = new Set();
  let outros;
  function group_outros() {
      outros = {
          r: 0,
          c: [],
          p: outros // parent group
      };
  }
  function check_outros() {
      if (!outros.r) {
          run_all(outros.c);
      }
      outros = outros.p;
  }
  function transition_in(block, local) {
      if (block && block.i) {
          outroing.delete(block);
          block.i(local);
      }
  }
  function transition_out(block, local, detach, callback) {
      if (block && block.o) {
          if (outroing.has(block))
              return;
          outroing.add(block);
          outros.c.push(() => {
              outroing.delete(block);
              if (callback) {
                  if (detach)
                      block.d(1);
                  callback();
              }
          });
          block.o(local);
      }
  }
  const null_transition = { duration: 0 };
  function create_bidirectional_transition(node, fn, params, intro) {
      let config = fn(node, params);
      let t = intro ? 0 : 1;
      let running_program = null;
      let pending_program = null;
      let animation_name = null;
      function clear_animation() {
          if (animation_name)
              delete_rule(node, animation_name);
      }
      function init(program, duration) {
          const d = program.b - t;
          duration *= Math.abs(d);
          return {
              a: t,
              b: program.b,
              d,
              duration,
              start: program.start,
              end: program.start + duration,
              group: program.group
          };
      }
      function go(b) {
          const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
          const program = {
              start: now() + delay,
              b
          };
          if (!b) {
              // @ts-ignore todo: improve typings
              program.group = outros;
              outros.r += 1;
          }
          if (running_program) {
              pending_program = program;
          }
          else {
              // if this is an intro, and there's a delay, we need to do
              // an initial tick and/or apply CSS animation immediately
              if (css) {
                  clear_animation();
                  animation_name = create_rule(node, t, b, duration, delay, easing, css);
              }
              if (b)
                  tick(0, 1);
              running_program = init(program, duration);
              add_render_callback(() => dispatch(node, b, 'start'));
              loop(now => {
                  if (pending_program && now > pending_program.start) {
                      running_program = init(pending_program, duration);
                      pending_program = null;
                      dispatch(node, running_program.b, 'start');
                      if (css) {
                          clear_animation();
                          animation_name = create_rule(node, t, running_program.b, running_program.duration, 0, easing, config.css);
                      }
                  }
                  if (running_program) {
                      if (now >= running_program.end) {
                          tick(t = running_program.b, 1 - t);
                          dispatch(node, running_program.b, 'end');
                          if (!pending_program) {
                              // we're done
                              if (running_program.b) {
                                  // intro — we can tidy up immediately
                                  clear_animation();
                              }
                              else {
                                  // outro — needs to be coordinated
                                  if (!--running_program.group.r)
                                      run_all(running_program.group.c);
                              }
                          }
                          running_program = null;
                      }
                      else if (now >= running_program.start) {
                          const p = now - running_program.start;
                          t = running_program.a + running_program.d * easing(p / running_program.duration);
                          tick(t, 1 - t);
                      }
                  }
                  return !!(running_program || pending_program);
              });
          }
      }
      return {
          run(b) {
              if (is_function(config)) {
                  wait().then(() => {
                      // @ts-ignore
                      config = config();
                      go(b);
                  });
              }
              else {
                  go(b);
              }
          },
          end() {
              clear_animation();
              running_program = pending_program = null;
          }
      };
  }
  function mount_component(component, target, anchor) {
      const { fragment, on_mount, on_destroy, after_update } = component.$$;
      fragment.m(target, anchor);
      // onMount happens before the initial afterUpdate
      add_render_callback(() => {
          const new_on_destroy = on_mount.map(run).filter(is_function);
          if (on_destroy) {
              on_destroy.push(...new_on_destroy);
          }
          else {
              // Edge case - component was destroyed immediately,
              // most likely as a result of a binding initialising
              run_all(new_on_destroy);
          }
          component.$$.on_mount = [];
      });
      after_update.forEach(add_render_callback);
  }
  function destroy_component(component, detaching) {
      if (component.$$.fragment) {
          run_all(component.$$.on_destroy);
          component.$$.fragment.d(detaching);
          // TODO null out other refs, including component.$$ (but need to
          // preserve final state?)
          component.$$.on_destroy = component.$$.fragment = null;
          component.$$.ctx = {};
      }
  }
  function make_dirty(component, key) {
      if (!component.$$.dirty) {
          dirty_components.push(component);
          schedule_update();
          component.$$.dirty = blank_object();
      }
      component.$$.dirty[key] = true;
  }
  function init(component, options, instance, create_fragment, not_equal, prop_names) {
      const parent_component = current_component;
      set_current_component(component);
      const props = options.props || {};
      const $$ = component.$$ = {
          fragment: null,
          ctx: null,
          // state
          props: prop_names,
          update: noop,
          not_equal,
          bound: blank_object(),
          // lifecycle
          on_mount: [],
          on_destroy: [],
          before_update: [],
          after_update: [],
          context: new Map(parent_component ? parent_component.$$.context : []),
          // everything else
          callbacks: blank_object(),
          dirty: null
      };
      let ready = false;
      $$.ctx = instance
          ? instance(component, props, (key, ret, value = ret) => {
              if ($$.ctx && not_equal($$.ctx[key], $$.ctx[key] = value)) {
                  if ($$.bound[key])
                      $$.bound[key](value);
                  if (ready)
                      make_dirty(component, key);
              }
              return ret;
          })
          : props;
      $$.update();
      ready = true;
      run_all($$.before_update);
      $$.fragment = create_fragment($$.ctx);
      if (options.target) {
          if (options.hydrate) {
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              $$.fragment.l(children(options.target));
          }
          else {
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              $$.fragment.c();
          }
          if (options.intro)
              transition_in(component.$$.fragment);
          mount_component(component, options.target, options.anchor);
          flush();
      }
      set_current_component(parent_component);
  }
  class SvelteComponent {
      $destroy() {
          destroy_component(this, 1);
          this.$destroy = noop;
      }
      $on(type, callback) {
          const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
          callbacks.push(callback);
          return () => {
              const index = callbacks.indexOf(callback);
              if (index !== -1)
                  callbacks.splice(index, 1);
          };
      }
      $set() {
          // overridden by instance, if it has props
      }
  }

  /* ./Button.svelte generated by Svelte v3.12.1 */

  function create_fragment(ctx) {
  	var button;

  	return {
  		c() {
  			button = element("button");
  			button.textContent = "Press me";
  			attr(button, "class", "svelte-4knzkl");
  		},

  		m(target, anchor) {
  			insert(target, button, anchor);
  		},

  		p: noop,
  		i: noop,
  		o: noop,

  		d(detaching) {
  			if (detaching) {
  				detach(button);
  			}
  		}
  	};
  }

  class Button extends SvelteComponent {
  	constructor(options) {
  		super();
  		init(this, options, null, create_fragment, safe_not_equal, []);
  	}
  }

  /* sys/_examples/Ex_0_912d2194e1f19ad19c7043c0751f15d5.svelte generated by Svelte v3.12.1 */

  function create_fragment$1(ctx) {
  	var h1, t0, t1, t2, t3, current;

  	var button = new Button({});

  	return {
  		c() {
  			h1 = element("h1");
  			t0 = text("Hello ");
  			t1 = text(name);
  			t2 = text("!");
  			t3 = space();
  			button.$$.fragment.c();
  			attr(h1, "class", "svelte-mrcdp1");
  		},

  		m(target, anchor) {
  			insert(target, h1, anchor);
  			append(h1, t0);
  			append(h1, t1);
  			append(h1, t2);
  			insert(target, t3, anchor);
  			mount_component(button, target, anchor);
  			current = true;
  		},

  		p: noop,

  		i(local) {
  			if (current) return;
  			transition_in(button.$$.fragment, local);

  			current = true;
  		},

  		o(local) {
  			transition_out(button.$$.fragment, local);
  			current = false;
  		},

  		d(detaching) {
  			if (detaching) {
  				detach(h1);
  				detach(t3);
  			}

  			destroy_component(button, detaching);
  		}
  	};
  }

  let name = 'World';

  class Ex_0_912d2194e1f19ad19c7043c0751f15d5 extends SvelteComponent {
  	constructor(options) {
  		super();
  		init(this, options, null, create_fragment$1, safe_not_equal, []);
  	}
  }

  function cubicOut(t) {
      const f = t - 1.0;
      return f * f * f + 1.0;
  }

  function slide(node, { delay = 0, duration = 400, easing = cubicOut }) {
      const style = getComputedStyle(node);
      const opacity = +style.opacity;
      const height = parseFloat(style.height);
      const padding_top = parseFloat(style.paddingTop);
      const padding_bottom = parseFloat(style.paddingBottom);
      const margin_top = parseFloat(style.marginTop);
      const margin_bottom = parseFloat(style.marginBottom);
      const border_top_width = parseFloat(style.borderTopWidth);
      const border_bottom_width = parseFloat(style.borderBottomWidth);
      return {
          delay,
          duration,
          easing,
          css: t => `overflow: hidden;` +
              `opacity: ${Math.min(t * 20, 1) * opacity};` +
              `height: ${t * height}px;` +
              `padding-top: ${t * padding_top}px;` +
              `padding-bottom: ${t * padding_bottom}px;` +
              `margin-top: ${t * margin_top}px;` +
              `margin-bottom: ${t * margin_bottom}px;` +
              `border-top-width: ${t * border_top_width}px;` +
              `border-bottom-width: ${t * border_bottom_width}px;`
      };
  }

  /* sys/_examples/Ex_1_912d2194e1f19ad19c7043c0751f15d5.svelte generated by Svelte v3.12.1 */

  // (9:0) {#if show}
  function create_if_block(ctx) {
  	var div, h10, t0, t1, t2, t3, h11, t4, t5, t6, t7, h12, t8, t9, t10, t11, h13, t12, t13, t14, t15, h14, t16, t17, t18, div_transition, current;

  	return {
  		c() {
  			div = element("div");
  			h10 = element("h1");
  			t0 = text("Buy ");
  			t1 = text(name$1);
  			t2 = text("!");
  			t3 = space();
  			h11 = element("h1");
  			t4 = text("Buy ");
  			t5 = text(name$1);
  			t6 = text("!");
  			t7 = space();
  			h12 = element("h1");
  			t8 = text("Buy ");
  			t9 = text(name$1);
  			t10 = text("!");
  			t11 = space();
  			h13 = element("h1");
  			t12 = text("Buy ");
  			t13 = text(name$1);
  			t14 = text("!");
  			t15 = space();
  			h14 = element("h1");
  			t16 = text("Buy ");
  			t17 = text(name$1);
  			t18 = text("!");
  		},

  		m(target, anchor) {
  			insert(target, div, anchor);
  			append(div, h10);
  			append(h10, t0);
  			append(h10, t1);
  			append(h10, t2);
  			append(div, t3);
  			append(div, h11);
  			append(h11, t4);
  			append(h11, t5);
  			append(h11, t6);
  			append(div, t7);
  			append(div, h12);
  			append(h12, t8);
  			append(h12, t9);
  			append(h12, t10);
  			append(div, t11);
  			append(div, h13);
  			append(h13, t12);
  			append(h13, t13);
  			append(h13, t14);
  			append(div, t15);
  			append(div, h14);
  			append(h14, t16);
  			append(h14, t17);
  			append(h14, t18);
  			current = true;
  		},

  		p: noop,

  		i(local) {
  			if (current) return;
  			add_render_callback(() => {
  				if (!div_transition) div_transition = create_bidirectional_transition(div, slide, {}, true);
  				div_transition.run(1);
  			});

  			current = true;
  		},

  		o(local) {
  			if (!div_transition) div_transition = create_bidirectional_transition(div, slide, {}, false);
  			div_transition.run(0);

  			current = false;
  		},

  		d(detaching) {
  			if (detaching) {
  				detach(div);
  				if (div_transition) div_transition.end();
  			}
  		}
  	};
  }

  function create_fragment$2(ctx) {
  	var button, t_1, if_block_anchor, current, dispose;

  	var if_block = (ctx.show) && create_if_block();

  	return {
  		c() {
  			button = element("button");
  			button.textContent = "downdrop";
  			t_1 = space();
  			if (if_block) if_block.c();
  			if_block_anchor = empty();
  			dispose = listen(button, "click", ctx.click_handler);
  		},

  		m(target, anchor) {
  			insert(target, button, anchor);
  			insert(target, t_1, anchor);
  			if (if_block) if_block.m(target, anchor);
  			insert(target, if_block_anchor, anchor);
  			current = true;
  		},

  		p(changed, ctx) {
  			if (ctx.show) {
  				if (if_block) {
  					if_block.p(changed, ctx);
  					transition_in(if_block, 1);
  				} else {
  					if_block = create_if_block();
  					if_block.c();
  					transition_in(if_block, 1);
  					if_block.m(if_block_anchor.parentNode, if_block_anchor);
  				}
  			} else if (if_block) {
  				group_outros();
  				transition_out(if_block, 1, 1, () => {
  					if_block = null;
  				});
  				check_outros();
  			}
  		},

  		i(local) {
  			if (current) return;
  			transition_in(if_block);
  			current = true;
  		},

  		o(local) {
  			transition_out(if_block);
  			current = false;
  		},

  		d(detaching) {
  			if (detaching) {
  				detach(button);
  				detach(t_1);
  			}

  			if (if_block) if_block.d(detaching);

  			if (detaching) {
  				detach(if_block_anchor);
  			}

  			dispose();
  		}
  	};
  }

  let name$1 = 'NewWorld';

  function instance($$self, $$props, $$invalidate) {
  	
      let show = false;

  	const click_handler = (e) => $$invalidate('show', show = !show);

  	return { show, click_handler };
  }

  class Ex_1_912d2194e1f19ad19c7043c0751f15d5 extends SvelteComponent {
  	constructor(options) {
  		super();
  		init(this, options, instance, create_fragment$2, safe_not_equal, []);
  	}
  }

  exports.Ex_0_912d2194e1f19ad19c7043c0751f15d5 = Ex_0_912d2194e1f19ad19c7043c0751f15d5;
  exports.Ex_1_912d2194e1f19ad19c7043c0751f15d5 = Ex_1_912d2194e1f19ad19c7043c0751f15d5;

  return exports;

}({}));

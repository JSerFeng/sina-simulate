function isObj(x) {
  return x !== null && typeof x === 'object'
}
const baseHandler = {
  get(target, key) {
    let result = Reflect.get(target, key)
    track(target, key)
    return isObj(result) ? reactive(result) : result
  },
  set(target, key, value) {
    let oldVal = target[key]
    if (oldVal === value)
      return true
    let result = Reflect.set(target, key, value)
    trigger(target, key)
    return result
  }
}
const toProxy = new WeakMap() //缓存被代理的对象
const toRaw = new WeakMap() //缓存代理过的的proxy
function reactive(obj) {
  let res = toProxy.get(obj)
  if (res)
    return res
  if (toRaw.has(obj))
    return obj
  const observed = new Proxy(obj, baseHandler)
  toProxy.set(obj, observed)
  toRaw.set(observed, obj)
  return observed
}
function effect(fn, options = {}) {
  const effect = createEffect(fn, options)
  if (!effect.lazy) {
    effect()
  }
  return effect
}
function createEffect(fn, options) {
  let effect = function effect(...args) {
    return run(fn, effect, ...args)
  }
  effect.lazy = options.lazy
  return effect
}
const activeEffectsStack = []
function run(fn, effect, ...args) {
  if (activeEffectsStack.indexOf(effect) === -1) {

    try {
      activeEffectsStack.push(effect)
      return fn(...args)
    } finally {
      activeEffectsStack.pop(effect)
    }
  }

}
function computed(fn) {
  const getter = effect(fn, { lazy: true })
  return {
    get value() {
      return getter()
    }
  }
}
const targetMap = new WeakMap()
function track(target, key) {
  const effect = activeEffectsStack[activeEffectsStack.length - 1]
  let depsMap = targetMap.get(target)
  if (!depsMap) 
    targetMap.set(target, depsMap=new Map())
  let deps = depsMap.get(key)
  if (!deps)
    depsMap.set(key, deps=new Set())
  if (deps.has(effect))
    return
   deps.add(effect)
}
function trigger(target, key) {
  const depsMap = targetMap.get(target)
  if (!depsMap) 
    return
  const deps = depsMap.get(key)
  deps.forEach(effect => {
    effect() 
  });
}
export {
  reactive,
  computed,
  effect
}
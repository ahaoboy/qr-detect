


const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"

// Use a lookup table to find the index.
const lookup = typeof Uint8Array === "undefined" ? [] : new Uint8Array(256)
for (let i = 0; i < chars.length; i++) {
  lookup[chars.charCodeAt(i)] = i
}

function decode(base64)  {
  let bufferLength = base64.length * 0.75
  const len = base64.length
  let p = 0

  if (base64[base64.length - 1] === "=") {
    bufferLength--
    if (base64[base64.length - 2] === "=") {
      bufferLength--
    }
  }

  const arraybuffer = new ArrayBuffer(bufferLength)
  const bytes = new Uint8Array(arraybuffer)

  for (let i = 0; i < len; i += 4) {
    const encoded1 = lookup[base64.charCodeAt(i)]
    const encoded2 = lookup[base64.charCodeAt(i + 1)]
    const encoded3 = lookup[base64.charCodeAt(i + 2)]
    const encoded4 = lookup[base64.charCodeAt(i + 3)]

    bytes[p++] = (encoded1 << 2) | (encoded2 >> 4)
    bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2)
    bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63)
  }

  return arraybuffer
}


let wasm;

const cachedTextDecoder = (typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-8', { ignoreBOM: true, fatal: true }) : { decode: () => { throw Error('TextDecoder not available') } } );

if (typeof TextDecoder !== 'undefined') { cachedTextDecoder.decode(); };

let cachedUint8Memory0 = null;

function getUint8Memory0() {
    if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

const heap = new Array(128).fill(undefined);

heap.push(undefined, null, true, false);

let heap_next = heap.length;

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

let WASM_VECTOR_LEN = 0;

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1, 1) >>> 0;
    getUint8Memory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

let cachedInt32Memory0 = null;

function getInt32Memory0() {
    if (cachedInt32Memory0 === null || cachedInt32Memory0.byteLength === 0) {
        cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32Memory0;
}

let cachedUint32Memory0 = null;

function getUint32Memory0() {
    if (cachedUint32Memory0 === null || cachedUint32Memory0.byteLength === 0) {
        cachedUint32Memory0 = new Uint32Array(wasm.memory.buffer);
    }
    return cachedUint32Memory0;
}

function getObject(idx) { return heap[idx]; }

function dropObject(idx) {
    if (idx < 132) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

function getArrayJsValueFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    const mem = getUint32Memory0();
    const slice = mem.subarray(ptr / 4, ptr / 4 + len);
    const result = [];
    for (let i = 0; i < slice.length; i++) {
        result.push(takeObject(slice[i]));
    }
    return result;
}
/**
* @param {Uint8Array} file
* @returns {(string)[]}
*/
export function detect(file) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passArray8ToWasm0(file, wasm.__wbindgen_export_0);
        const len0 = WASM_VECTOR_LEN;
        wasm.detect(retptr, ptr0, len0);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        var v2 = getArrayJsValueFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export_1(r0, r1 * 4, 4);
        return v2;
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

function __wbg_get_imports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
        const ret = getStringFromWasm0(arg0, arg1);
        return addHeapObject(ret);
    };

    return imports;
}

function __wbg_init_memory(imports, maybe_memory) {

}

function __wbg_finalize_init(instance, module) {
    wasm = instance.exports;
    initSync.__wbindgen_wasm_module = module;
    cachedInt32Memory0 = null;
    cachedUint32Memory0 = null;
    cachedUint8Memory0 = null;


    return wasm;
}

function initSync() {
    if (wasm !== undefined) return wasm;

    const imports = __wbg_get_imports();

    __wbg_init_memory(imports);

    

const bytes = decode(base64);
const module = new WebAssembly.Module(bytes);



    const instance = new WebAssembly.Instance(module, imports);

    return __wbg_finalize_init(instance, module);
}


initSync() 
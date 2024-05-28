use wasm_bindgen::prelude::wasm_bindgen;

#[wasm_bindgen]
pub fn detect(file: Vec<u8>) -> Vec<String> {
    let img = image::load_from_memory(&file).unwrap();
    let decoder = bardecoder::default_decoder();
    let results = decoder.decode(&img);
    
    results.into_iter().filter_map(|i| i.ok()).collect()
}
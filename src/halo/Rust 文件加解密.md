---
icon: edit
date: 2022-10-25
category:
  - Rust
headerDepth: 5
---


# Rust 文件加解密
```Cargo.toml```
```toml
[dependencies]
aes = "0.7.5"
block-modes = "0.8.1"
hex-literal = "0.2.1"
rand = "0.8.4"
bytebuffer = "0.2.1"
base64 = "0.13.0"
```
main.rs
```rust
use aes::Aes256;
use block_modes::{BlockMode, Cbc};
use block_modes::block_padding::Pkcs7;
use rand::seq::SliceRandom;
use std::fs;
type AesCbc = Cbc<Aes256, Pkcs7>;
use std::fs::File;
use std::io::prelude::*;
const BASE_STR: &str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const KEY:&str = "01234567012345670123456701234567";
fn gen_ascii_chars(size: usize) -> String {
    let mut rng = &mut rand::thread_rng();
    String::from_utf8(
            BASE_STR.as_bytes()
            .choose_multiple(&mut rng, size)
            .cloned()
            .collect()
    ).unwrap()
}

fn encrypt(key: &str, data: &[u8]) -> String {
    let iv_str = gen_ascii_chars(16);
    let iv = iv_str.as_bytes();
    let cipher = AesCbc::new_from_slices(key.as_bytes(), iv).unwrap();
    let ciphertext = cipher.encrypt_vec(data);
    let mut buffer = bytebuffer::ByteBuffer::from_bytes(iv);
    buffer.write_bytes(&ciphertext);
    base64::encode(buffer.to_bytes())
}

fn decrypt(key: &str, data: &str) -> String {
    let bytes = base64::decode(data).unwrap();
    let cipher = AesCbc::new_from_slices(key.as_bytes(), &bytes[0..16]).unwrap();
    String::from_utf8_lossy(cipher.decrypt_vec(&bytes[16..]).unwrap().as_slice()).to_string()
}
fn decryptToByte(key: &str, data: &str) -> Vec<u8> {
    let bytes = base64::decode(data).unwrap();
    let cipher = AesCbc::new_from_slices(key.as_bytes(), &bytes[0..16]).unwrap();
    cipher.decrypt_vec(&bytes[16..]).unwrap()
}

fn encodefile(path:&str,encodePath:&str){
    //let plaintext = "hello worldsssss";
    let plaintext = fs::read(path).unwrap();
    let classstr = String::from_utf8_lossy(plaintext.as_slice()).to_string();
    let enc = encrypt(KEY, plaintext.as_slice());
   // println!("{}", enc);
    let dec = decrypt(KEY, &enc);
    assert_eq!(classstr, dec);
  // println!("{}", dec);
    let mut file = File::create(encodePath).unwrap();
    file.write(enc.as_bytes()).unwrap();
}
fn decodefile(path:&str,decodePath:&str){
    let plaintext = fs::read(path).unwrap();
    let classstr = String::from_utf8_lossy(plaintext.as_slice()).to_string();
  //  let dec = decrypt(key, &classstr);
    let decodeBytes = decryptToByte(KEY,&classstr);
    let mut file = File::create(decodePath).unwrap();
    file.write(decodeBytes.as_slice()).unwrap();
}
fn main() {
    encodefile("C:\\Users\\61778\\Desktop\\HelloWorld.class","C:\\Users\\61778\\Desktop\\test1\\HelloWorldDE.class");
    decodefile("C:\\Users\\61778\\Desktop\\test1\\HelloWorldDE.class","C:\\Users\\61778\\Desktop\\test1\\HelloWorld.class");
}
```
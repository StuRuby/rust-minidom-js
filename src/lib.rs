extern crate minify;
use minify::{html::minify as html_minify, json::minify as json_minify};
use napi_derive::napi;

#[napi]
pub fn minify_html(input: String) -> String {
  html_minify(&input)
}

#[napi]
pub fn minify_json(input: String) -> String {
    json_minify(&input)
}
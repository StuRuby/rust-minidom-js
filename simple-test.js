const { minify_html } = require('./lib/index')
const fs = require('fs');


console.log(minify_html);

// const code = fs.readFileSync('/Users/zhongwu/Fliggy/packages/Hotel/hotel-search/src/miniapp-native/hotel-recommend/container/HotelCardPackage/index.axml', 'utf-8');

const minifiedXml = minify_html(`<DocumentElement param="value" xmlns="http://www.example.com/namespace" >
<FirstElement>
    Some Text



</FirstElement>


<SecondElement param2="something">


    Pre-Text <Inline>Inlined text</Inline> Post-text.
</SecondElement>
</DocumentElement>`);

console.log(minifiedXml);
#! /usr/local/bin/node
const path = require('path')
// fix
const fs = require('fs')
function change(p){
  let content = String(fs.readFileSync(p))
  if(!content.includes('Price.')){
    return
  }
  let success = false
  content = content.replace(/(import \{)([^}]+)(\}\s*from\s*'react-gm')/g, function (t,a,b,c){
    success = true
    if(t.includes('Price')){
      return t
    }
    b = b.replace(/(.*?)(\s*)$/, (t,a,b)=>{
      if(b){
        c = ' ' + c
      }
      return a
    })
    return `${a}${b}, Price${c}`
  })
  if(!success){
    content = content.replace(/import.*'gm-i18n'/, (t)=>{
      return `${t}
import { Price } from 'react-gm'`
    })
  }
  fs.writeFileSync(p, content)
}
function write(content){
  fs.writeFileSync('./tmp', content + '\n')
}
process.argv.slice(2).forEach((p)=>{
  change(p)
})
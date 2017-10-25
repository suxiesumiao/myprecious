## em

 > em作为font-size的单位时，其代表父元素的字体大小，em作为其他属性单位时，代表自身字体大小——MDN

 详细例子参见 [Here](./em.html)

 例子之中分别看下自身元素的 `font-size` `line-height`

 ## rem

 > rem作用于非根元素时，相对于根元素字体大小；rem作用于根元素字体大小时，相对于其出初始字体大小——MDN

 rem取值分为两种情况，设置在根元素时和非根元素时

 ``` css
 /* 作用于根元素，相对于原始大小（16px），所以html的font-size为32px*/
html {font-size: 2rem}
/* 作用于非根元素，相对于根元素字体大小，所以为64px */
p {font-size: 2rem}
 ```
 参见例子 [Here](./rem.html)
The قلب Programming Language
===========================
قلب is a simple, [Scheme-like](http://en.wikipedia.org/wiki/Scheme_language) programming language that you code entirely in [Arabic](http://en.wikipedia.org/wiki/Modern_Standard_Arabic). It is an exploration of the impact of human culture on computer science, the role of tradition in software engineering, and the connection between natural and computer languages.

Syntax
------
قلب has a minimal Scheme-like parenthesized syntax. Note that GitHub's layout engine will mangle all code samples in this Readme.

Hello world looks like this

```scheme
(قول "مرحبا يا عالم!")
```


Name
----
قلب is pronounced 'alb and means "heart" in Arabic. It is a recursive acronym standing for قلب: لغة برمجة, pronounced 'alb: lughat barmajeh, meaning "'alb: a programming language."

Acknowledgments
---------------
The implementation is largely based on [Lispy, Peter Norvig's 90 line Lisp interpreter](http://norvig.com/lispy.html)

The REPL and Editor are built on [CodeMirror](http://codemirror.net/), &copy; 2012 by Marijn Haverbeke <marijnh@gmail.com>

Ajax queries are handled using a modified version of [jx.js](http://www.openjs.com/scripts/jx/)

The parser is built using [Peg.js](http://pegjs.majda.cz/), &copy; 2010-2012 David Majda

The implementation of the Fibonacci algorithm is based on [this one](http://rosettacode.org/wiki/Fibonacci_sequence#Scheme) from [Rosetta Code](http://rosettacode.org/).

The implementation of Conway's Game of Life is based on [this one](http://rosettacode.org/wiki/Conway%27s_Game_of_Life#Scheme) from [Rosetta Code](http://rosettacode.org/).

Arabic spelling and grammar help from the wonderful [Haitham Ennasr](https://twitter.com/e_n_n_a_s_r)

Legal
-----
Copyright &copy; Ramsey Nasser 2012, provided under the [MIT License](http://opensource.org/licenses/MIT).

Developed at [Eyebeam](http://eyebeam.org/) as part of my fellowship exploring code as a medium of self expression.
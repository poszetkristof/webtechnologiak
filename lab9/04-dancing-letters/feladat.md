# Feladat

Készíts egy HTML dokumentumot és egy SCSS stíluslapot a _Sass is wonderful!_ szöveg az alábbi módon történő megjelenítéséhez:

1. minden egyes betű háttérszíneként egy véletlenszerűen választott színt kell használni,
1. minden egyes betűt el kell forgatni úgy, hogy a forgatás mértéke egy -15 és 15 fok közötti véletlen egész szám legyen.

Adj egy olyan megoldást, mely véletlenszerű RGB színeket használ (lásd az [`rgb()`](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/rgb()) funkcionális jelölést).

Adj egy olyan másik megoldást is, mely a színeket élénk színek egy előre definiált listájából választja.

Véletlen számok előállításához a [`math.random($limit)`](https://sass-lang.com/documentation/modules/math#random) függvényt kell használni.

Ha a színek választása egy előre definiált listából történik, akkor a [`sass:list`](https://sass-lang.com/documentation/modules/list) modult is használnod kell.

A betűket elforgató és a háttérszínüket beállító stílus szabályokat egy [`@for`](https://sass-lang.com/documentation/at-rules/control/for) ciklusban kell generálni.

A szöveget vízszintesen és függőlegesen is a böngésző nézetablak közepén kell megjeleníteni.

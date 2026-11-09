# Feladat

Készíts [Sass](https://sass-lang.com/) stíluslapot a [colors.html](colors.html) dokumentum az alábbi módon történő megjelenítéséhez:

![](colors.png)

A középső sáv szilvaszínű (`plum`) kell, hogy legyen, de ezt paraméterként kell megadni a stíluslapon, hogy megváltoztatható legyen. A többi sáv színét automatikusan kell megválasztani. Az elrendezés ki kell, hogy töltse az egész böngészőablakot.

A [`sass:color`](https://sass-lang.com/documentation/modules/color) modul [`color.adjust()`](https://sass-lang.com/documentation/modules/color#adjust) függvényét kell használnod a `$hue` és `$lightness` argumentumokkal.

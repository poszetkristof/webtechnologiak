# Feladat

Tervezz XML formátumot egy számítógépes program menürendszerének ábrázolásához. Egy menü az alábbiakat tartalmazhatja tetszőleges számban és sorrendben:

* egy másik menü (azaz almenü),
* egy menüpont,
* egy elválasztó.

A menüknek és a menüpontoknak is kell, hogy legyen egy neve, amelyet egy attribútummal kell megadni.

Készíts DTD-t a formátumhoz, valamit a formátum használatának szemléltetéséhez egy olyan XML dokumentumot, amely az alábbi menürendszert írja le:

* Main:
  * File:
    * New
      * XML
      * JSON
      * Text
    * Open
    * Save
    * Save as
    * [elválasztó]
    * Exit
  * Edit:
    * Undo
    * Redo
    * [elválasztó]
    * Cut
    * Copy
    * Paste
  * Help:
    * About

Ebben a feladatban nem cél az, hogy a dokumentum webböngészőben is megjelenítésre kerüljön.

# Formázás VS Code-ban

## Hogyan formázz?

1. Nyisd meg a fájlt.
2. Nyomd meg: **Shift + Alt + F**

HTML/CSS-nél ennyi elég.

## XML és DTD formázás

Ehhez kell a Red Hat **XML** bővítmény. Ez a DTD fájlokat is formázza.

### Ha ezt írja ki: `There is no formatter for 'xml' files installed`

Nincs telepítve az XML bővítmény.

1. Nyomd meg: **Ctrl + Shift + X**
2. Keress rá: **XML**
3. Telepítsd a **Red Hat** által készített **XML**-t.

<!-- screenshot -->

4. Nyomd meg újra: **Shift + Alt + F**

### Ha telepítve van, de még mindig ezt írja ki

Próbáld ezeket sorban, mindegyik után nyomj egy **Shift + Alt + F**-et:

1. **Indítsd újra a VS Code-ot.** A bővítménynek kell egy kis idő, mire első indításkor mindent letölt.
2. **Nézd meg, be van-e kapcsolva.** Nyomd meg: **Ctrl + Shift + X**, keresd meg az XML-t. Ha **Enable** gombot látsz, kattints rá.
3. **Nézd meg a jobb alsó sarkot.** Ott ki van írva, minek látja a VS Code a fájlt. Ha nem **XML** (hanem pl. `Plain Text`), kattints rá, és válaszd: **XML**.

<!-- screenshot -->

### Ha ezt írja ki: `Configure Default Formatter`

A bővítmény már telepítve van, csak ki kell választani.

1. Kattints a **Configure Default Formatter** gombra.
2. Válaszd: **XML (Red Hat)**

<!-- screenshot -->

3. Nyomd meg újra: **Shift + Alt + F**

## Tipp: formázás mentéskor

1. Nyomd meg: **Ctrl + ,**
2. Keress rá: **Format On Save**
3. Pipáld be.

<!-- screenshot -->

Ezután minden **Ctrl + S**-nél magától formáz.

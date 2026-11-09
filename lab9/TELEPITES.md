# Sass telepítése (Windows)

A Sass-hoz **Node.js** kell. Nyiss egy terminált, és írd be:

```
node -v
```

**v20.19.0** vagy újabb kell. Ha a gép nem ismeri a `node` parancsot, vagy régebbi a verzió, telepítsd a Node.js LTS verzióját innen: https://nodejs.org

## 1. megoldás: globális telepítés

```
npm install -g sass --registry=https://registry.npmjs.org/
```

Utána **zárd be a terminált, és nyiss egy újat** (VS Code-ban az egész VS Code-ot indítsd újra). Ellenőrzés:

```
sass --version
```

Ha kiír egy verziószámot (pl. `1.108.1`), kész. Fordítás a feladat mappájában:

```
sass --watch colors.scss:colors.css
```

## 2. megoldás: helyi telepítés (ha az 1. nem megy)

Ilyenkor a Sass csak ebbe a mappába kerül. A `lab9` mappában futtasd:

```
npm install sass --registry=https://registry.npmjs.org/
```

Létrejön egy `node_modules` mappa, egy `package.json` és egy `package-lock.json`. Ezekhez nem kell nyúlnod.

A parancs elé ilyenkor mindig **`npx`** kell. Szintén a `lab9` mappában:

```
npx sass --version
npx sass --watch 01-colors/colors.scss:01-colors/colors.css
```

## Ha valami nem megy

### Ezt írja ki: `The term 'sass' is not recognized ...` vagy `'sass' is not recognized as an internal or external command`

A gép nem találja a `sass` parancsot.

1. Nyiss új terminált. A régi nem látja az újonnan telepített programot.
2. Ha még mindig ezt írja, nézd meg, hova került a Sass:
   ```
   npm prefix -g
   ```
   Ez kiír egy mappát, abban van a `sass.cmd`. Ha ez a mappa nincs benne a PATH-ban, a gép nem találja meg a `sass`-t.
3. Ilyenkor telepítsd a szokásos helyre (ez a mappa benne van a PATH-ban), aztán nyiss új terminált:
   ```
   npm install -g sass --registry=https://registry.npmjs.org/ --prefix "%APPDATA%\npm"
   ```
   Ez **cmd**-ben (Command Prompt) működik így. PowerShellben a `"%APPDATA%\npm"` helyett `"$env:APPDATA\npm"` kell.
4. Ha így sem megy: **2. megoldás**.

### Fordításkor hibát ír az `@use "sass:color";` sorra

Valószínűleg a régi `node-sass` csomag van fent, ami már nem támogatott, és nem ismeri az `@use`-t. Töröld, és tedd fel a rendes `sass`-t:

```
npm uninstall -g node-sass
npm install -g sass --registry=https://registry.npmjs.org/
```

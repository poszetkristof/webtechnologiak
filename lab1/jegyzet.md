# I. rész – XML

## 1. Mi az a jelölőnyelv (markup language)?

**Jelölőnyelv** = olyan számítógépes nyelv, amivel egy szöveget **annotálunk** (megjelölünk), azaz
**metaadatot** (adatot az adatról) rendelünk a szövegrészekhez úgy, hogy a jelölés jól elkülönüljön magától a szövegtől.

A `hamlet.txt`-ben:

```
HAMLET
    O all you host of heaven! O earth! What else?
    ...
    [Writing]
```

Ránézésre **mi, emberek** tudjuk, hogy a `HAMLET` egy szereplő neve, a következő sorok az ő szövege,
a `[Writing]` pedig egy rendezői utasítás. **A gépnek fogalma sincs róla** – számára ez csak karakterek sorozata.

A jelölés ezt teszi explicitté:

```xml
<speaker>Hamlet</speaker>
<line>O all you host of heaven! O earth! What else?</line>
<stagedir>Writing</stagedir>
```

Most már a gép is „érti": ez egy megszólaló, ez egy verssor, ez egy színpadi utasítás.
Ettől kezdve **kereshető, rendezhető, átalakítható, megjeleníthető** – automatikusan feldolgozható.

**Fontos:** a jelölés nem a _kinézetről_ szól, hanem a _jelentésről / szerkezetről_.
Nem azt mondjuk, hogy „ez a sor legyen félkövér", hanem azt, hogy „ez egy megszólaló neve".
Hogy hogyan **néz ki**, azt majd a CSS mondja meg.

Ismert jelölőnyelvek: **HTML** (weboldalak), **Markdown** (README, ez a jegyzet is), **LaTeX**
(szakdolgozat, képletek), **XML** (konfigurációs fájlok, SVG, adatcsere).

---

## 2. Mi az XML?

**XML = Extensible Markup Language = Kiterjeszthető Jelölőnyelv.**
W3C ajánlás, 1998 óta létezik. Az **SGML** leegyszerűsített részhalmaza.

- **Szűkebb értelemben:** egy _szintaxis_ strukturált dokumentumok leírására, ami lehetővé teszi azok automatikus feldolgozását.
- **Tágabb értelemben:** egy egész specifikációcsalád: sémanyelvek, lekérdezőnyelvek (XPath, XQuery), transzformációs nyelvek (XSLT), API-k (DOM, SAX)…

### Miért „kiterjeszthető"?

Mert **nincs előre definiált címkekészlet**. Az XML nem mondja meg, milyen elemek létezhetnek –
azt **te találod ki** az adott feladathoz. Színdarabot kell leírnunk, ezért kitaláltuk a
`play`, `author`, `title`, `act`, `scene`, `speech`, `speaker`, `line`, `stagedir` elemeket.

Ezért mondjuk, hogy az XML egy **meta-jelölőnyelv**: nyelv, amivel jelölőnyelveket lehet definiálni.

### XML vs. HTML

|              | XML                                                 | HTML                                |
| ------------ | --------------------------------------------------- | ----------------------------------- |
| Címkekészlet | nincs előre definiálva, te találod ki               | rögzített (`<p>`, `<div>`, `<h1>`…) |
| Cél          | **adatok leírása** (szerkezet, jelentés)            | **információ megjelenítése**        |
| Kis/nagybetű | **különbözik** (`<Line>` ≠ `<line>`)                | nem különbözik                      |
| Szigorúság   | szigorú, egy hiba = a dokumentum nem dolgozható fel | elnéző, a böngésző „megjavítja"     |

**Előnyök:** egyszerű (sima szöveges fájl), nyílt, platformfüggetlen, univerzális adatcsere-formátum.
**Hátrányok:** bőbeszédű, nagy tárigény. **Alternatíva:** a **JSON** – mai webes API-knál ez a jellemzőbb,
de az XML sem tűnt el: `pom.xml`, SVG, `.docx`/`.odt` (belül XML!), Android layout…

---

## 3. Hogyan épül fel egy XML-dokumentum?

A `hamlet.xml` eleje:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!-- Source: http://shakespeare.mit.edu/hamlet/ -->
<?xml-stylesheet type="text/css" href="play.css"?>
<play>
    <author>William Shakespeare</author>
    <title>The Tragedy of Hamlet, Prince of Denmark</title>
    <act>
        ...
    </act>
</play>
```

Egy XML-dokumentum két részből áll:

1. **Prológus** (prolog) – a gyökérelem _előtti_ rész: XML-deklaráció, megjegyzések, feldolgozási utasítások.
2. **Dokumentumelem / gyökérelem** (root element) – pontosan **egy** darab, ez fogja körbe az egészet.

### 3.1 XML-deklaráció

```xml
<?xml version="1.0" encoding="UTF-8"?>
```

- Ha van, **muszáj a fájl legelső karakterének lennie** – előtte még szóköz vagy üres sor sem lehet!
- `version="1.0"` – az XML verziója.
- `encoding="UTF-8"` – a **karakterkódolás**: megmondja a feldolgozónak, hogyan kell a fájl
  bájtjaiból karaktereket csinálni.

**Unicode és UTF-8 röviden:**

- Egy fájl a lemezen **bájtok sorozata**; a karakterkódolás mondja meg, melyik bájtsorozat melyik betű.
  Ha rossz kódolással olvassa a program, jön az „ékezethalál": `Ãrvíztűrő`.
- **Unicode**: egyetlen közös karakterkészlet a világ minden írásrendszeréhez. Minden karakternek van
  egy száma, a **kódpont**: `A` = U+0041, `ő` = U+0151, `—` (gondolatjel) = U+2014.
- **UTF-8**: a Unicode legelterjedtebb kódolása, a web szabványos kódolása. Az ASCII karaktereket
  1 bájton tárolja, a többit 2–4 bájton.
- Az `encoding="UTF-8"` csak egy _ígéret_ – a fájlt tényleg UTF-8-ként kell elmenteni!
  (VS Code-ban a jobb alsó sarokban látszik és állítható.)

### 3.2 Megjegyzés (comment)

```xml
<!-- Source: http://shakespeare.mit.edu/hamlet/ -->
```

- `<!--` kezdi, `-->` zárja. A feldolgozó átugorja, a böngésző nem jeleníti meg.
- **Nem lehet benne `--`**, nem ágyazható egymásba, és **nem állhat címkén belül**.

### 3.3 Feldolgozási utasítás (processing instruction)

```xml
<?xml-stylesheet type="text/css" href="play.css"?>
```

- Általános alakja: `<?cél adatok?>` – **utasítás a dokumentumot feldolgozó alkalmazásnak.**
- Az `xml-stylesheet` azt üzeni a böngészőnek: **ehhez a dokumentumhoz a `play.css` stíluslapot használd.**
- `href="play.css"` – **relatív** útvonal: a CSS ugyanabban a mappában van, mint az XML.
- **A prológusban kell lennie, a gyökérelem előtt.**

> **Ez a kulcssor!** Ha hiányzik vagy elgépelted a fájlnevet, a böngésző csak a nyers XML-fát mutatja, stílus nélkül.

### 3.4 Elemek (elements)

```xml
<author>William Shakespeare</author>
```

| Rész                  | Neve                                                 |
| --------------------- | ---------------------------------------------------- |
| `<author>`            | **kezdőcímke** (start tag)                           |
| `author`              | az **elem neve**                                     |
| `William Shakespeare` | az elem **tartalma** (itt: karakteres adat / szöveg) |
| `</author>`           | **záró címke** (end tag)                             |
| az egész              | **elem** (element)                                   |

**Üres elem** rövidíthető: `<br/>` = `<br></br>`.

**Elemnevek szabályai:** betűvel vagy `_`-sal kezdődik (számmal nem!); nincs benne szóköz;
**kis- és nagybetű különbözik** (`<Line>…</line>` = hiba!); nem kezdődhet `xml`-lel;
legyen **beszédes**: `speaker`, nem `s1`.

### 3.5 Attribútumok (attributes)

```xml
<act number="I">
```

- `number` az **attribútum neve**, `"I"` az **értéke** – mindig idézőjelben (`"` vagy `'`).
- Egy elemen egy attribútumnév csak egyszer szerepelhet.
- A mi megoldásunkban **nincs attribútum** – a felvonás száma a `<title>ACT I</title>` elemben van, mert megjelenítendő szöveg.

> **Mikor elem, mikor attribútum?** Ami maga is _tartalom_ (megjelenik, hosszabb, szerkezete lehet) → **elem**.
> Ami _metaadat_ az elemről (azonosító, nyelv, típus) → **attribútum**.

### 3.6 Karakter- és entitáshivatkozások

A kiinduló `hamlet.txt`-ben a gondolatjel helyén két kötőjel állt:

```
My tables,--meet it is I set it down,
```

Ez írógépes pótmegoldás: a helyes karakter a hosszú gondolatjel (angolul **em dash**): `—`.
Ha a billentyűzeten nincs rá gomb, az XML-be **karakterhivatkozással** írhatjuk be:

```xml
<line>My tables,&#x2014;meet it is I set it down,</line>
```

| Rész   | Jelentés                                           |
| ------ | -------------------------------------------------- |
| `&#`   | karakterhivatkozás kezdete                         |
| `x`    | a szám **hexadecimális** (nélküle decimális lenne) |
| `2014` | a Unicode-kódpont: U+2014 = EM DASH = `—`          |
| `;`    | a hivatkozás vége (**kötelező!**)                  |

Ugyanez decimálisan: `&#8212;` (mert 0x2014 = 8212).

**Előre definiált entitások** – a jelölés saját karaktereit nem írhatjuk le közvetlenül:

| Írás     | Karakter | Mikor kell                                                    |
| -------- | -------- | ------------------------------------------------------------- |
| `&lt;`   | `<`      | **mindig**, ha szövegben kisebb jel kell                      |
| `&amp;`  | `&`      | **mindig**, ha szövegben és-jel kell                          |
| `&gt;`   | `>`      | ajánlott                                                      |
| `&quot;` | `"`      | attribútumértékben, ha `"` közé tettük                        |
| `&apos;` | `'`      | attribútumértékben, ha `'` közé tettük (elemtartalomban nem!) |

### 3.7 A dokumentum mint fa

Egy jólformált XML-dokumentum mindig egy **fa** (tree):

```
play                                  ← gyökérelem (root)
├── author            "William Shakespeare"
├── title             "The Tragedy of Hamlet..."
└── act
    ├── title         "ACT I"
    └── scene
        ├── title     "SCENE V. Another part of the platform."
        ├── speech
        │   ├── speaker   "Hamlet"
        │   ├── line      "O all you host of heaven!..."
        │   ├── line      ...
        │   └── stagedir  "Writing"
        ├── stagedir  "Enter HORATIO and MARCELLUS"
        └── speech
            ├── speaker "Horatio"
            └── line
                └── stagedir "Within"     ← beágyazott elem a line-on belül!
```

**Rokonsági fogalmak** (ezek kellenek a CSS-hez!):

- **szülő** (parent) / **gyerek** (child): a `speech` a `speaker` szülője, a `speaker` a `speech` gyereke.
- **leszármazott** (descendant): a `speaker` leszármazottja a `scene`-nek, az `act`-nak és a `play`-nek is.
- **ős** (ancestor): a fenti fordítottja.
- **testvér** (sibling): a `speaker` és a `line` testvérek.

> Figyeld meg a `stagedir` elemet: **kétféle helyen** fordul elő.
>
> - `scene` gyerekeként: `<stagedir>Enter HORATIO and MARCELLUS</stagedir>` → önálló, középre igazított sor.
> - `line` gyerekeként: `<line><stagedir>Within</stagedir> My lord, my lord,—</line>` → a sor _elején_, folytatólagosan.
>
> **Ugyanaz az elemnév, más környezetben, más megjelenés.** Ezt a CSS-ben a `>` (gyerek) kombinátorral kezeljük.

### 3.8 Jólformáltság (well-formedness)

Egy XML-dokumentum **jólformált**, ha betartja az XML szintaktikai szabályait:

1. Pontosan **egy gyökérelem** van.
2. **Minden elemnek van záró címkéje** (vagy üreselem-jelölés `/>`).
3. Az elemek **helyesen vannak egymásba ágyazva**: ✅ `<a><b></b></a>` ❌ `<a><b></a></b>`
4. A kezdő- és záró címke **neve pontosan egyezik** (kis/nagybetű is!).
5. Az attribútumértékek idézőjelben állnak.
6. A `<` és `&` karaktereket helyettesíteni kell (`&lt;`, `&amp;`).

---

# II. rész – CSS

## 4. Mire szolgál a CSS?

**CSS = Cascading Style Sheets = Lépcsőzetes/Kaszkádolt Stíluslapok.**

Az XML **csak a szerkezetet** írja le. A böngésző nem tudja, hogy egy `<speaker>` hogyan nézzen ki –
hiszen ezt az elemet mi találtuk ki. A **CSS** mondja meg: **melyik elem hogyan jelenjen meg.**

**Miért külön fájlban?**

- **Tartalom és megjelenés szétválasztása** – ugyanaz az XML többféle stíluslappal másképp nézhet ki.
- **Újrafelhasználhatóság** – egy stíluslap sok dokumentumhoz.
- **Karbantarthatóság** – ha a színt akarod változtatni, egy helyen kell.

A kapcsolatot az `<?xml-stylesheet type="text/css" href="play.css"?>` sor teremti meg.

---

## 5. Hogyan épül fel egy CSS-stíluslap?

A stíluslap **szabályok** (rules) sorozata:

```css
speaker {
  font-weight: bold;
  text-transform: uppercase;
}
```

| Rész                 | Szakszó (angol)   | Szakszó (magyar)      | Jelentés                               |
| -------------------- | ----------------- | --------------------- | -------------------------------------- |
| `speaker { … }`      | rule / ruleset    | szabály               | egy teljes szabály                     |
| `speaker`            | selector          | **szelektor**         | _melyik_ elemekre vonatkozik           |
| `{ … }`              | declaration block | **deklarációs blokk** | a szabály törzse                       |
| `font-weight: bold;` | declaration       | **deklaráció**        | egy beállítás                          |
| `font-weight`        | property          | **tulajdonság**       | _mit_ állítunk be                      |
| `bold`               | value             | **érték**             | _mire_ állítjuk                        |
| `;`                  | –                 | pontosvessző          | lezárja a deklarációt (az utolsót is!) |

**Megjegyzés CSS-ben:** `/* így */` – a `//` **NEM működik** CSS-ben!

### 5.1 Szelektorok

| Szelektor      | Neve                           | Mit választ ki                                             |
| -------------- | ------------------------------ | ---------------------------------------------------------- |
| `line`         | típusszelektor                 | **minden** `line` elemet                                   |
| `*`            | **univerzális szelektor**      | **minden** elemet                                          |
| `A, B`         | szelektorlista / csoportosítás | minden `A`-t **és** minden `B`-t                           |
| `A B` (szóköz) | **leszármazott** kombinátor    | minden `B`-t, ami `A`-n _belül_ van, akármilyen mélyen     |
| `A > B`        | **gyerek** kombinátor          | csak azokat a `B`-ket, amiknek a **közvetlen szülője** `A` |
| `A::before`    | **pszeudoelem**                | generált tartalom az `A` tartalma _elé_                    |
| `A::after`     | pszeudoelem                    | generált tartalom az `A` tartalma _mögé_                   |

### 5.2 Kaszkád, specifikusság, öröklődés

**Kaszkád (cascade)** – ugyanarra az elemre több szabály is vonatkozhat, a böngészőnek el kell döntenie, melyik nyer:

1. **Specifikusság (specificity):** a „konkrétabb" szelektor nyer.
   `*` → 0, `stagedir` → 1, `line > stagedir` → 2.
   Ezért nyer a `line > stagedir { display: inline; }` a `* { display: block; }` fölött – nem a sorrend miatt, hanem mert konkrétabb.
2. **Sorrend:** _azonos_ specifikusság esetén az **utolsó** nyer.

**Öröklődés (inheritance):** a szöveggel kapcsolatos tulajdonságok (`color`, `font-family`, `font-size`,
`line-height`, `text-align`, `letter-spacing`) „lecsorognak" a gyerekekre. Ezért elég a `play` elemre
beállítani a betűtípust – az egész darab megörökli.
**Nem öröklődik:** `display`, `margin`, `padding`, `border`, `background-color`, `width`.

---

## 6. A dobozmodell és a `display` tulajdonság

### 6.1 A dobozmodell (box model)

```
┌─────────────────────────────────────┐
│  margin  (külső térköz, átlátszó)   │
│  ┌───────────────────────────────┐  │
│  │  border  (szegély)            │  │
│  │  ┌─────────────────────────┐  │  │
│  │  │  padding (belső térköz) │  │  │
│  │  │  ┌───────────────────┐  │  │  │
│  │  │  │   content         │  │  │  │
│  │  │  │   (a tartalom)    │  │  │  │
│  │  │  └───────────────────┘  │  │  │
│  │  └─────────────────────────┘  │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

- **content** – a tényleges tartalom; a `width` / `height` alapból erre vonatkozik.
- **padding** – belső térköz a tartalom és a szegély között. **Beleesik a háttérszínbe!**
- **border** – a szegély vonala: `border: <vastagság> <stílus> <szín>`, pl. `medium double black`
  (stílus: `solid`, `dashed`, `dotted`, `double`, `none`).
- **margin** – külső térköz a szomszédos elemek felé. **Átlátszó.**

Irányonként is megadható (`padding-top`, `margin-left`, `border-top`…), az összevont alak óramutató szerint, felülről:

```css
padding: 1em; /* mind a négy oldal */
padding: 1em 2em; /* fent-lent | jobbra-balra */
padding: 1em 2em 3em 4em; /* fent | jobb | lent | bal */
```

> **`box-sizing`:** alapból a `width` csak a tartalom szélessége, a padding és a border **hozzáadódik**
> (`width: 300px; padding: 20px;` → 340 px széles doboz). `box-sizing: border-box` esetén a `width` a teljes dobozra vonatkozik.

### 6.2 `display` – miért lesz olvasható a darab?

```css
* {
  display: block; /* minden elem új sorban kezdődik */
}

line > stagedir {
  display: inline; /* kivéve a soron belüli rendezői utasítást: (Within) My lord... */
}
```

Miért nem simán `stagedir`? Mert akkor az önálló, `scene`-beli `Enter HORATIO and MARCELLUS` is inline lenne,
és beleragadna az előző szövegbe.

|                      | `display: block`                                    | `display: inline`                              |
| -------------------- | --------------------------------------------------- | ---------------------------------------------- |
| Sortörés             | **új sorban kezdődik**, utána is törik a sor        | a szövegfolyamban marad, **nem tör sort**      |
| Szélesség            | a **teljes rendelkezésre álló szélességet** kitölti | csak annyit foglal, amennyi a tartalmához kell |
| `width` / `height`   | **működik**                                         | **nem működik**                                |
| Függőleges `margin`  | **működik**                                         | **nincs hatása**                               |
| Függőleges `padding` | **működik**                                         | látszik, de **nem tolja el a sorokat**         |
| Példa HTML-ben       | `<p>`, `<div>`, `<h1>`                              | `<span>`, `<a>`, `<em>`, `<strong>`            |

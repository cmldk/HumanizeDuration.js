// HumanizeDuration.js - https://git.io/j0HgmQ

/* global define, module */

(function () {
  // This has to be defined separately because of a bug: we want to alias
  // `gr` and `el` for backwards-compatiblity. In a breaking change, we can
  // remove `gr` entirely.
  // See https://github.com/EvanHahn/HumanizeDuration.js/issues/143 for more.
  var greek = {
    y: function (c) {
      return c === 1 ? "χρόνος" : "χρόνια";
    },
    mo: function (c) {
      return c === 1 ? "μήνας" : "μήνες";
    },
    w: function (c) {
      return c === 1 ? "εβδομάδα" : "εβδομάδες";
    },
    d: function (c) {
      return c === 1 ? "μέρα" : "μέρες";
    },
    h: function (c) {
      return c === 1 ? "ώρα" : "ώρες";
    },
    m: function (c) {
      return c === 1 ? "λεπτό" : "λεπτά";
    },
    s: function (c) {
      return c === 1 ? "δευτερόλεπτο" : "δευτερόλεπτα";
    },
    ms: function (c) {
      return (c === 1 ? "χιλιοστό" : "χιλιοστά") + " του δευτερολέπτου";
    },
    decimal: ",",
    future: "σε %s",
    past: "%s πριν"
  };

  var ARABIC_DIGITS = ["۰", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

  var LANGUAGES = {
    af: {
      y: "jaar",
      mo: function (c) {
        return "maand" + (c === 1 ? "" : "e");
      },
      w: function (c) {
        return c === 1 ? "week" : "weke";
      },
      d: function (c) {
        return c === 1 ? "dag" : "dae";
      },
      h: function (c) {
        return c === 1 ? "uur" : "ure";
      },
      m: function (c) {
        return c === 1 ? "minuut" : "minute";
      },
      s: function (c) {
        return "sekonde" + (c === 1 ? "" : "s");
      },
      ms: function (c) {
        return "millisekonde" + (c === 1 ? "" : "s");
      },
      decimal: ",",
      future: "oor %s",
      past: "%s gelede"
    },
    ar: {
      y: function (c) {
        return ["سنة", "سنتان", "سنوات"][getArabicForm(c)];
      },
      mo: function (c) {
        return ["شهر", "شهران", "أشهر"][getArabicForm(c)];
      },
      w: function (c) {
        return ["أسبوع", "أسبوعين", "أسابيع"][getArabicForm(c)];
      },
      d: function (c) {
        return ["يوم", "يومين", "أيام"][getArabicForm(c)];
      },
      h: function (c) {
        return ["ساعة", "ساعتين", "ساعات"][getArabicForm(c)];
      },
      m: function (c) {
        return ["دقيقة", "دقيقتان", "دقائق"][getArabicForm(c)];
      },
      s: function (c) {
        return ["ثانية", "ثانيتان", "ثواني"][getArabicForm(c)];
      },
      ms: function (c) {
        return ["جزء من الثانية", "جزآن من الثانية", "أجزاء من الثانية"][
          getArabicForm(c)
        ];
      },
      decimal: ",",
      delimiter: " و ",
      _formatCount: function (count, decimal) {
        var replacements = assign(ARABIC_DIGITS, { ".": decimal });
        var characters = count.toString().split("");
        for (var i = 0; i < characters.length; i++) {
          var character = characters[i];
          if (has(replacements, character)) {
            characters[i] = replacements[character];
          }
        }
        return characters.join("");
      },
      future: "بعد %s",
      past: "منذ %s"
    },
    bg: {
      y: function (c) {
        return ["години", "година", "години"][getSlavicForm(c)];
      },
      mo: function (c) {
        return ["месеца", "месец", "месеца"][getSlavicForm(c)];
      },
      w: function (c) {
        return ["седмици", "седмица", "седмици"][getSlavicForm(c)];
      },
      d: function (c) {
        return ["дни", "ден", "дни"][getSlavicForm(c)];
      },
      h: function (c) {
        return ["часа", "час", "часа"][getSlavicForm(c)];
      },
      m: function (c) {
        return ["минути", "минута", "минути"][getSlavicForm(c)];
      },
      s: function (c) {
        return ["секунди", "секунда", "секунди"][getSlavicForm(c)];
      },
      ms: function (c) {
        return ["милисекунди", "милисекунда", "милисекунди"][getSlavicForm(c)];
      },
      decimal: ",",
      future: "след %s",
      past: "преди %s"
    },
    bn: {
      y: "বছর",
      mo: "মাস",
      w: "সপ্তাহ",
      d: "দিন",
      h: "ঘন্টা",
      m: "মিনিট",
      s: "সেকেন্ড",
      ms: "মিলিসেকেন্ড",
      future: "%s পরে",
      past: "%s আগে"
    },
    ca: {
      y: function (c) {
        return "any" + (c === 1 ? "" : "s");
      },
      mo: function (c) {
        return "mes" + (c === 1 ? "" : "os");
      },
      w: function (c) {
        return "setman" + (c === 1 ? "a" : "es");
      },
      d: function (c) {
        return "di" + (c === 1 ? "a" : "es");
      },
      h: function (c) {
        return "hor" + (c === 1 ? "a" : "es");
      },
      m: function (c) {
        return "minut" + (c === 1 ? "" : "s");
      },
      s: function (c) {
        return "segon" + (c === 1 ? "" : "s");
      },
      ms: function (c) {
        return "milisegon" + (c === 1 ? "" : "s");
      },
      decimal: ",",
      future: "d'aquí %s",
      past: "fa %s"
    },
    cs: {
      y: function (c) {
        return ["rok", "roku", "roky", "let"][getCzechOrSlovakForm(c)];
      },
      mo: function (c) {
        return ["měsíc", "měsíce", "měsíce", "měsíců"][getCzechOrSlovakForm(c)];
      },
      w: function (c) {
        return ["týden", "týdne", "týdny", "týdnů"][getCzechOrSlovakForm(c)];
      },
      d: function (c) {
        return ["den", "dne", "dny", "dní"][getCzechOrSlovakForm(c)];
      },
      h: function (c) {
        return ["hodina", "hodiny", "hodiny", "hodin"][getCzechOrSlovakForm(c)];
      },
      m: function (c) {
        return ["minuta", "minuty", "minuty", "minut"][getCzechOrSlovakForm(c)];
      },
      s: function (c) {
        return ["sekunda", "sekundy", "sekundy", "sekund"][
          getCzechOrSlovakForm(c)
        ];
      },
      ms: function (c) {
        return ["milisekunda", "milisekundy", "milisekundy", "milisekund"][
          getCzechOrSlovakForm(c)
        ];
      },
      decimal: ",",
      future: "za %s",
      past: "před %s"
    },
    cy: {
      y: "flwyddyn",
      mo: "mis",
      w: "wythnos",
      d: "diwrnod",
      h: "awr",
      m: "munud",
      s: "eiliad",
      ms: "milieiliad",
      future: "mewn %s",
      past: "%s yn ôl"
    },
    da: {
      y: "år",
      mo: function (c) {
        return "måned" + (c === 1 ? "" : "er");
      },
      w: function (c) {
        return "uge" + (c === 1 ? "" : "r");
      },
      d: function (c) {
        return "dag" + (c === 1 ? "" : "e");
      },
      h: function (c) {
        return "time" + (c === 1 ? "" : "r");
      },
      m: function (c) {
        return "minut" + (c === 1 ? "" : "ter");
      },
      s: function (c) {
        return "sekund" + (c === 1 ? "" : "er");
      },
      ms: function (c) {
        return "millisekund" + (c === 1 ? "" : "er");
      },
      decimal: ",",
      future: "om %s",
      past: "%s siden"
    },
    de: {
      y: function (c) {
        return "Jahr" + (c === 1 ? "" : "e");
      },
      mo: function (c) {
        return "Monat" + (c === 1 ? "" : "e");
      },
      w: function (c) {
        return "Woche" + (c === 1 ? "" : "n");
      },
      d: function (c) {
        return "Tag" + (c === 1 ? "" : "e");
      },
      h: function (c) {
        return "Stunde" + (c === 1 ? "" : "n");
      },
      m: function (c) {
        return "Minute" + (c === 1 ? "" : "n");
      },
      s: function (c) {
        return "Sekunde" + (c === 1 ? "" : "n");
      },
      ms: function (c) {
        return "Millisekunde" + (c === 1 ? "" : "n");
      },
      decimal: ",",
      future: "in %s",
      past: "vor %s"
    },
    el: greek,
    en: {
      y: function (c) {
        return "year" + (c === 1 ? "" : "s");
      },
      mo: function (c) {
        return "month" + (c === 1 ? "" : "s");
      },
      w: function (c) {
        return "week" + (c === 1 ? "" : "s");
      },
      d: function (c) {
        return "day" + (c === 1 ? "" : "s");
      },
      h: function (c) {
        return "hour" + (c === 1 ? "" : "s");
      },
      m: function (c) {
        return "minute" + (c === 1 ? "" : "s");
      },
      s: function (c) {
        return "second" + (c === 1 ? "" : "s");
      },
      ms: function (c) {
        return "millisecond" + (c === 1 ? "" : "s");
      },
      decimal: ".",
      future: "in %s",
      past: "%s ago"
    },
    eo: {
      y: function (c) {
        return "jaro" + (c === 1 ? "" : "j");
      },
      mo: function (c) {
        return "monato" + (c === 1 ? "" : "j");
      },
      w: function (c) {
        return "semajno" + (c === 1 ? "" : "j");
      },
      d: function (c) {
        return "tago" + (c === 1 ? "" : "j");
      },
      h: function (c) {
        return "horo" + (c === 1 ? "" : "j");
      },
      m: function (c) {
        return "minuto" + (c === 1 ? "" : "j");
      },
      s: function (c) {
        return "sekundo" + (c === 1 ? "" : "j");
      },
      ms: function (c) {
        return "milisekundo" + (c === 1 ? "" : "j");
      },
      decimal: ",",
      future: "post %s",
      past: "antaŭ %s"
    },
    es: {
      y: function (c) {
        return "año" + (c === 1 ? "" : "s");
      },
      mo: function (c) {
        return "mes" + (c === 1 ? "" : "es");
      },
      w: function (c) {
        return "semana" + (c === 1 ? "" : "s");
      },
      d: function (c) {
        return "día" + (c === 1 ? "" : "s");
      },
      h: function (c) {
        return "hora" + (c === 1 ? "" : "s");
      },
      m: function (c) {
        return "minuto" + (c === 1 ? "" : "s");
      },
      s: function (c) {
        return "segundo" + (c === 1 ? "" : "s");
      },
      ms: function (c) {
        return "milisegundo" + (c === 1 ? "" : "s");
      },
      decimal: ",",
      future: "en %s",
      past: "hace %s"
    },
    et: {
      y: function (c) {
        return "aasta" + (c === 1 ? "" : "t");
      },
      mo: function (c) {
        return "kuu" + (c === 1 ? "" : "d");
      },
      w: function (c) {
        return "nädal" + (c === 1 ? "" : "at");
      },
      d: function (c) {
        return "päev" + (c === 1 ? "" : "a");
      },
      h: function (c) {
        return "tund" + (c === 1 ? "" : "i");
      },
      m: function (c) {
        return "minut" + (c === 1 ? "" : "it");
      },
      s: function (c) {
        return "sekund" + (c === 1 ? "" : "it");
      },
      ms: function (c) {
        return "millisekund" + (c === 1 ? "" : "it");
      },
      decimal: ",",
      future: "%s pärast",
      past: "%s tagasi"
    },
    eu: {
      y: "urte",
      mo: "hilabete",
      w: "aste",
      d: "egun",
      h: "ordu",
      m: "minutu",
      s: "segundo",
      ms: "milisegundo",
      decimal: ",",
      future: "%s barru",
      past: "duela %s"
    },
    fa: {
      y: "سال",
      mo: "ماه",
      w: "هفته",
      d: "روز",
      h: "ساعت",
      m: "دقیقه",
      s: "ثانیه",
      ms: "میلی ثانیه",
      decimal: ".",
      future: "در %s",
      past: "%s پیش"
    },
    fi: {
      y: function (c) {
        return c === 1 ? "vuosi" : "vuotta";
      },
      mo: function (c) {
        return c === 1 ? "kuukausi" : "kuukautta";
      },
      w: function (c) {
        return "viikko" + (c === 1 ? "" : "a");
      },
      d: function (c) {
        return "päivä" + (c === 1 ? "" : "ä");
      },
      h: function (c) {
        return "tunti" + (c === 1 ? "" : "a");
      },
      m: function (c) {
        return "minuutti" + (c === 1 ? "" : "a");
      },
      s: function (c) {
        return "sekunti" + (c === 1 ? "" : "a");
      },
      ms: function (c) {
        return "millisekunti" + (c === 1 ? "" : "a");
      },
      decimal: ",",
      future: "%s päästä",
      past: "%s sitten"
    },
    fo: {
      y: "ár",
      mo: function (c) {
        return c === 1 ? "mánaður" : "mánaðir";
      },
      w: function (c) {
        return c === 1 ? "vika" : "vikur";
      },
      d: function (c) {
        return c === 1 ? "dagur" : "dagar";
      },
      h: function (c) {
        return c === 1 ? "tími" : "tímar";
      },
      m: function (c) {
        return c === 1 ? "minuttur" : "minuttir";
      },
      s: "sekund",
      ms: "millisekund",
      decimal: ",",
      future: "um %s",
      past: "%s síðani"
    },
    fr: {
      y: function (c) {
        return "an" + (c >= 2 ? "s" : "");
      },
      mo: "mois",
      w: function (c) {
        return "semaine" + (c >= 2 ? "s" : "");
      },
      d: function (c) {
        return "jour" + (c >= 2 ? "s" : "");
      },
      h: function (c) {
        return "heure" + (c >= 2 ? "s" : "");
      },
      m: function (c) {
        return "minute" + (c >= 2 ? "s" : "");
      },
      s: function (c) {
        return "seconde" + (c >= 2 ? "s" : "");
      },
      ms: function (c) {
        return "milliseconde" + (c >= 2 ? "s" : "");
      },
      decimal: ",",
      future: "dans %s",
      past: "il y a %s"
    },
    gr: greek,
    he: {
      y: function (c) {
        return c === 1 ? "שנה" : "שנים";
      },
      mo: function (c) {
        return c === 1 ? "חודש" : "חודשים";
      },
      w: function (c) {
        return c === 1 ? "שבוע" : "שבועות";
      },
      d: function (c) {
        return c === 1 ? "יום" : "ימים";
      },
      h: function (c) {
        return c === 1 ? "שעה" : "שעות";
      },
      m: function (c) {
        return c === 1 ? "דקה" : "דקות";
      },
      s: function (c) {
        return c === 1 ? "שניה" : "שניות";
      },
      ms: function (c) {
        return c === 1 ? "מילישנייה" : "מילישניות";
      },
      decimal: ".",
      future: "בעוד %s",
      past: "לפני %s"
    },
    hr: {
      y: function (c) {
        if (c % 10 === 2 || c % 10 === 3 || c % 10 === 4) {
          return "godine";
        }
        return "godina";
      },
      mo: function (c) {
        if (c === 1) {
          return "mjesec";
        } else if (c === 2 || c === 3 || c === 4) {
          return "mjeseca";
        }
        return "mjeseci";
      },
      w: function (c) {
        if (c % 10 === 1 && c !== 11) {
          return "tjedan";
        }
        return "tjedna";
      },
      d: function (c) {
        return c === 1 ? "dan" : "dana";
      },
      h: function (c) {
        if (c === 1) {
          return "sat";
        } else if (c === 2 || c === 3 || c === 4) {
          return "sata";
        }
        return "sati";
      },
      m: function (c) {
        var mod10 = c % 10;
        if ((mod10 === 2 || mod10 === 3 || mod10 === 4) && (c < 10 || c > 14)) {
          return "minute";
        }
        return "minuta";
      },
      s: function (c) {
        var mod10 = c % 10;
        if (mod10 === 5 || (Math.floor(c) === c && c >= 10 && c <= 19)) {
          return "sekundi";
        } else if (mod10 === 1) {
          return "sekunda";
        } else if (mod10 === 2 || mod10 === 3 || mod10 === 4) {
          return "sekunde";
        }
        return "sekundi";
      },
      ms: function (c) {
        if (c === 1) {
          return "milisekunda";
        } else if (c % 10 === 2 || c % 10 === 3 || c % 10 === 4) {
          return "milisekunde";
        }
        return "milisekundi";
      },
      decimal: ",",
      future: "za %s",
      past: "prije %s"
    },
    hi: {
      y: "साल",
      mo: function (c) {
        return c === 1 ? "महीना" : "महीने";
      },
      w: function (c) {
        return c === 1 ? "हफ़्ता" : "हफ्ते";
      },
      d: "दिन",
      h: function (c) {
        return c === 1 ? "घंटा" : "घंटे";
      },
      m: "मिनट",
      s: "सेकंड",
      ms: "मिलीसेकंड",
      decimal: ".",
      future: "%s में",
      past: "%s पहले"
    },
    hu: {
      y: "év",
      mo: "hónap",
      w: "hét",
      d: "nap",
      h: "óra",
      m: "perc",
      s: "másodperc",
      ms: "ezredmásodperc",
      decimal: ",",
      future: "%s múlva",
      past: "%s"
    },
    id: {
      y: "tahun",
      mo: "bulan",
      w: "minggu",
      d: "hari",
      h: "jam",
      m: "menit",
      s: "detik",
      ms: "milidetik",
      decimal: ".",
      future: "dalam %s",
      past: "%s yang lalu"
    },
    is: {
      y: "ár",
      mo: function (c) {
        return "mánuð" + (c === 1 ? "ur" : "ir");
      },
      w: function (c) {
        return "vik" + (c === 1 ? "a" : "ur");
      },
      d: function (c) {
        return "dag" + (c === 1 ? "ur" : "ar");
      },
      h: function (c) {
        return "klukkutím" + (c === 1 ? "i" : "ar");
      },
      m: function (c) {
        return "mínút" + (c === 1 ? "a" : "ur");
      },
      s: function (c) {
        return "sekúnd" + (c === 1 ? "a" : "ur");
      },
      ms: function (c) {
        return "millisekúnd" + (c === 1 ? "a" : "ur");
      },
      decimal: ".",
      future: "eftir %s",
      past: "fyrir %s síðan"
    },
    it: {
      y: function (c) {
        return "ann" + (c === 1 ? "o" : "i");
      },
      mo: function (c) {
        return "mes" + (c === 1 ? "e" : "i");
      },
      w: function (c) {
        return "settiman" + (c === 1 ? "a" : "e");
      },
      d: function (c) {
        return "giorn" + (c === 1 ? "o" : "i");
      },
      h: function (c) {
        return "or" + (c === 1 ? "a" : "e");
      },
      m: function (c) {
        return "minut" + (c === 1 ? "o" : "i");
      },
      s: function (c) {
        return "second" + (c === 1 ? "o" : "i");
      },
      ms: function (c) {
        return "millisecond" + (c === 1 ? "o" : "i");
      },
      decimal: ",",
      future: "tra %s",
      past: "%s fa"
    },
    ja: {
      y: "年",
      mo: "ヶ月",
      w: "週",
      d: "日",
      h: "時間",
      m: "分",
      s: "秒",
      ms: "ミリ秒",
      decimal: ".",
      future: "%s後",
      past: "%s前"
    },
    km: {
      y: "ឆ្នាំ",
      mo: "ខែ",
      w: "សប្តាហ៍",
      d: "ថ្ងៃ",
      h: "ម៉ោង",
      m: "នាទី",
      s: "វិនាទី",
      ms: "មិល្លីវិនាទី",
      future: "%sទៀត",
      past: "%sមុន"
    },
    kn: {
      y: function (c) {
        return c === 1 ? "ವರ್ಷ" : "ವರ್ಷಗಳು";
      },
      mo: function (c) {
        return c === 1 ? "ತಿಂಗಳು" : "ತಿಂಗಳುಗಳು";
      },
      w: function (c) {
        return c === 1 ? "ವಾರ" : "ವಾರಗಳು";
      },
      d: function (c) {
        return c === 1 ? "ದಿನ" : "ದಿನಗಳು";
      },
      h: function (c) {
        return c === 1 ? "ಗಂಟೆ" : "ಗಂಟೆಗಳು";
      },
      m: function (c) {
        return c === 1 ? "ನಿಮಿಷ" : "ನಿಮಿಷಗಳು";
      },
      s: function (c) {
        return c === 1 ? "ಸೆಕೆಂಡ್" : "ಸೆಕೆಂಡುಗಳು";
      },
      ms: function (c) {
        return c === 1 ? "ಮಿಲಿಸೆಕೆಂಡ್" : "ಮಿಲಿಸೆಕೆಂಡುಗಳು";
      },
      future: "%s ನಂತರ",
      past: "%s ಹಿಂದೆ"
    },
    ko: {
      y: "년",
      mo: "개월",
      w: "주일",
      d: "일",
      h: "시간",
      m: "분",
      s: "초",
      ms: "밀리 초",
      decimal: ".",
      future: "%s 후",
      past: "%s 전"
    },
    ku: {
      y: "sal",
      mo: "meh",
      w: "hefte",
      d: "roj",
      h: "seet",
      m: "deqe",
      s: "saniye",
      ms: "mîlîçirk",
      decimal: ",",
      future: "له‌ %s",
      past: "%s"
    },
    lo: {
      y: "ປີ",
      mo: "ເດືອນ",
      w: "ອາທິດ",
      d: "ມື້",
      h: "ຊົ່ວໂມງ",
      m: "ນາທີ",
      s: "ວິນາທີ",
      ms: "ມິນລິວິນາທີ",
      decimal: ",",
      future: "ອີກ %s",
      past: "%sຜ່ານມາ"
    },
    lt: {
      y: function (c) {
        return c % 10 === 0 || (c % 100 >= 10 && c % 100 <= 20)
          ? "metų"
          : "metai";
      },
      mo: function (c) {
        return ["mėnuo", "mėnesiai", "mėnesių"][getLithuanianForm(c)];
      },
      w: function (c) {
        return ["savaitė", "savaitės", "savaičių"][getLithuanianForm(c)];
      },
      d: function (c) {
        return ["diena", "dienos", "dienų"][getLithuanianForm(c)];
      },
      h: function (c) {
        return ["valanda", "valandos", "valandų"][getLithuanianForm(c)];
      },
      m: function (c) {
        return ["minutė", "minutės", "minučių"][getLithuanianForm(c)];
      },
      s: function (c) {
        return ["sekundė", "sekundės", "sekundžių"][getLithuanianForm(c)];
      },
      ms: function (c) {
        return ["milisekundė", "milisekundės", "milisekundžių"][
          getLithuanianForm(c)
        ];
      },
      decimal: ",",
      future: "po %s",
      past: "prieš %s"
    },
    lv: {
      y: function (c) {
        return getLatvianForm(c) ? "gads" : "gadi";
      },
      mo: function (c) {
        return getLatvianForm(c) ? "mēnesis" : "mēneši";
      },
      w: function (c) {
        return getLatvianForm(c) ? "nedēļa" : "nedēļas";
      },
      d: function (c) {
        return getLatvianForm(c) ? "diena" : "dienas";
      },
      h: function (c) {
        return getLatvianForm(c) ? "stunda" : "stundas";
      },
      m: function (c) {
        return getLatvianForm(c) ? "minūte" : "minūtes";
      },
      s: function (c) {
        return getLatvianForm(c) ? "sekunde" : "sekundes";
      },
      ms: function (c) {
        return getLatvianForm(c) ? "milisekunde" : "milisekundes";
      },
      decimal: ",",
      future: "pēc %s",
      past: "pirms %s"
    },
    mk: {
      y: function (c) {
        return c === 1 ? "година" : "години";
      },
      mo: function (c) {
        return c === 1 ? "месец" : "месеци";
      },
      w: function (c) {
        return c === 1 ? "недела" : "недели";
      },
      d: function (c) {
        return c === 1 ? "ден" : "дена";
      },
      h: function (c) {
        return c === 1 ? "час" : "часа";
      },
      m: function (c) {
        return c === 1 ? "минута" : "минути";
      },
      s: function (c) {
        return c === 1 ? "секунда" : "секунди";
      },
      ms: function (c) {
        return c === 1 ? "милисекунда" : "милисекунди";
      },
      decimal: ",",
      future: "за %s",
      past: "пред %s"
    },
    mn: {
      y: "жил",
      mo: "сар",
      w: "долоо хоног",
      d: "өдөр",
      h: "цаг",
      m: "минут",
      s: "секунд",
      ms: "миллисекунд",
      decimal: ".",
      future: "%s дараа",
      past: "%s өмнө"
    },
    mr: {
      y: function (c) {
        return c === 1 ? "वर्ष" : "वर्षे";
      },
      mo: function (c) {
        return c === 1 ? "महिना" : "महिने";
      },
      w: function (c) {
        return c === 1 ? "आठवडा" : "आठवडे";
      },
      d: "दिवस",
      h: "तास",
      m: function (c) {
        return c === 1 ? "मिनिट" : "मिनिटे";
      },
      s: "सेकंद",
      ms: "मिलिसेकंद",
      future: "%sमध्ये",
      past: "%sपूर्वी"
    },
    ms: {
      y: "tahun",
      mo: "bulan",
      w: "minggu",
      d: "hari",
      h: "jam",
      m: "minit",
      s: "saat",
      ms: "milisaat",
      decimal: ".",
      future: "dalam %s",
      past: "%s yang lepas"
    },
    nl: {
      y: "jaar",
      mo: function (c) {
        return c === 1 ? "maand" : "maanden";
      },
      w: function (c) {
        return c === 1 ? "week" : "weken";
      },
      d: function (c) {
        return c === 1 ? "dag" : "dagen";
      },
      h: "uur",
      m: function (c) {
        return c === 1 ? "minuut" : "minuten";
      },
      s: function (c) {
        return c === 1 ? "seconde" : "seconden";
      },
      ms: function (c) {
        return c === 1 ? "milliseconde" : "milliseconden";
      },
      decimal: ",",
      future: "over %s",
      past: "%s geleden"
    },
    no: {
      y: "år",
      mo: function (c) {
        return "måned" + (c === 1 ? "" : "er");
      },
      w: function (c) {
        return "uke" + (c === 1 ? "" : "r");
      },
      d: function (c) {
        return "dag" + (c === 1 ? "" : "er");
      },
      h: function (c) {
        return "time" + (c === 1 ? "" : "r");
      },
      m: function (c) {
        return "minutt" + (c === 1 ? "" : "er");
      },
      s: function (c) {
        return "sekund" + (c === 1 ? "" : "er");
      },
      ms: function (c) {
        return "millisekund" + (c === 1 ? "" : "er");
      },
      decimal: ",",
      future: "om %s",
      past: "%s siden"
    },
    pl: {
      y: function (c) {
        return ["rok", "roku", "lata", "lat"][getPolishForm(c)];
      },
      mo: function (c) {
        return ["miesiąc", "miesiąca", "miesiące", "miesięcy"][
          getPolishForm(c)
        ];
      },
      w: function (c) {
        return ["tydzień", "tygodnia", "tygodnie", "tygodni"][getPolishForm(c)];
      },
      d: function (c) {
        return ["dzień", "dnia", "dni", "dni"][getPolishForm(c)];
      },
      h: function (c) {
        return ["godzina", "godziny", "godziny", "godzin"][getPolishForm(c)];
      },
      m: function (c) {
        return ["minuta", "minuty", "minuty", "minut"][getPolishForm(c)];
      },
      s: function (c) {
        return ["sekunda", "sekundy", "sekundy", "sekund"][getPolishForm(c)];
      },
      ms: function (c) {
        return ["milisekunda", "milisekundy", "milisekundy", "milisekund"][
          getPolishForm(c)
        ];
      },
      decimal: ",",
      future: "za %s",
      past: "%s temu"
    },
    pt: {
      y: function (c) {
        return "ano" + (c === 1 ? "" : "s");
      },
      mo: function (c) {
        return c === 1 ? "mês" : "meses";
      },
      w: function (c) {
        return "semana" + (c === 1 ? "" : "s");
      },
      d: function (c) {
        return "dia" + (c === 1 ? "" : "s");
      },
      h: function (c) {
        return "hora" + (c === 1 ? "" : "s");
      },
      m: function (c) {
        return "minuto" + (c === 1 ? "" : "s");
      },
      s: function (c) {
        return "segundo" + (c === 1 ? "" : "s");
      },
      ms: function (c) {
        return "milissegundo" + (c === 1 ? "" : "s");
      },
      decimal: ",",
      future: "em %s",
      past: "há %s"
    },
    ro: {
      y: function (c) {
        return c === 1 ? "an" : "ani";
      },
      mo: function (c) {
        return c === 1 ? "lună" : "luni";
      },
      w: function (c) {
        return c === 1 ? "săptămână" : "săptămâni";
      },
      d: function (c) {
        return c === 1 ? "zi" : "zile";
      },
      h: function (c) {
        return c === 1 ? "oră" : "ore";
      },
      m: function (c) {
        return c === 1 ? "minut" : "minute";
      },
      s: function (c) {
        return c === 1 ? "secundă" : "secunde";
      },
      ms: function (c) {
        return c === 1 ? "milisecundă" : "milisecunde";
      },
      decimal: ",",
      future: "peste %s",
      past: "%s în urmă"
    },
    ru: {
      y: function (c) {
        return ["лет", "год", "года"][getSlavicForm(c)];
      },
      mo: function (c) {
        return ["месяцев", "месяц", "месяца"][getSlavicForm(c)];
      },
      w: function (c) {
        return ["недель", "неделя", "недели"][getSlavicForm(c)];
      },
      d: function (c) {
        return ["дней", "день", "дня"][getSlavicForm(c)];
      },
      h: function (c) {
        return ["часов", "час", "часа"][getSlavicForm(c)];
      },
      m: function (c) {
        return ["минут", "минута", "минуты"][getSlavicForm(c)];
      },
      s: function (c) {
        return ["секунд", "секунда", "секунды"][getSlavicForm(c)];
      },
      ms: function (c) {
        return ["миллисекунд", "миллисекунда", "миллисекунды"][
          getSlavicForm(c)
        ];
      },
      decimal: ",",
      future: "через %s",
      past: "%s назад"
    },
    sq: {
      y: function (c) {
        return c === 1 ? "vit" : "vjet";
      },
      mo: "muaj",
      w: "javë",
      d: "ditë",
      h: "orë",
      m: function (c) {
        return "minut" + (c === 1 ? "ë" : "a");
      },
      s: function (c) {
        return "sekond" + (c === 1 ? "ë" : "a");
      },
      ms: function (c) {
        return "milisekond" + (c === 1 ? "ë" : "a");
      },
      decimal: ",",
      future: "në %s",
      past: "%s më parë"
    },
    sr: {
      y: function (c) {
        return ["години", "година", "године"][getSlavicForm(c)];
      },
      mo: function (c) {
        return ["месеци", "месец", "месеца"][getSlavicForm(c)];
      },
      w: function (c) {
        return ["недељи", "недеља", "недеље"][getSlavicForm(c)];
      },
      d: function (c) {
        return ["дани", "дан", "дана"][getSlavicForm(c)];
      },
      h: function (c) {
        return ["сати", "сат", "сата"][getSlavicForm(c)];
      },
      m: function (c) {
        return ["минута", "минут", "минута"][getSlavicForm(c)];
      },
      s: function (c) {
        return ["секунди", "секунда", "секунде"][getSlavicForm(c)];
      },
      ms: function (c) {
        return ["милисекунди", "милисекунда", "милисекунде"][getSlavicForm(c)];
      },
      decimal: ",",
      future: "за %s",
      past: "пре %s"
    },
    ta: {
      y: function (c) {
        return c === 1 ? "வருடம்" : "ஆண்டுகள்";
      },
      mo: function (c) {
        return c === 1 ? "மாதம்" : "மாதங்கள்";
      },
      w: function (c) {
        return c === 1 ? "வாரம்" : "வாரங்கள்";
      },
      d: function (c) {
        return c === 1 ? "நாள்" : "நாட்கள்";
      },
      h: function (c) {
        return c === 1 ? "மணி" : "மணிநேரம்";
      },
      m: function (c) {
        return "நிமிட" + (c === 1 ? "ம்" : "ங்கள்");
      },
      s: function (c) {
        return "வினாடி" + (c === 1 ? "" : "கள்");
      },
      ms: function (c) {
        return "மில்லி விநாடி" + (c === 1 ? "" : "கள்");
      },
      future: "%s இல்",
      past: "%s முன்"
    },
    te: {
      y: function (c) {
        return "సంవత్స" + (c === 1 ? "రం" : "రాల");
      },
      mo: function (c) {
        return "నెల" + (c === 1 ? "" : "ల");
      },
      w: function (c) {
        return c === 1 ? "వారం" : "వారాలు";
      },
      d: function (c) {
        return "రోజు" + (c === 1 ? "" : "లు");
      },
      h: function (c) {
        return "గంట" + (c === 1 ? "" : "లు");
      },
      m: function (c) {
        return c === 1 ? "నిమిషం" : "నిమిషాలు";
      },
      s: function (c) {
        return c === 1 ? "సెకను" : "సెకన్లు";
      },
      ms: function (c) {
        return c === 1 ? "మిల్లీసెకన్" : "మిల్లీసెకన్లు";
      },
      future: "%s లో",
      past: "%s క్రితం"
    },
    uk: {
      y: function (c) {
        return ["років", "рік", "роки"][getSlavicForm(c)];
      },
      mo: function (c) {
        return ["місяців", "місяць", "місяці"][getSlavicForm(c)];
      },
      w: function (c) {
        return ["тижнів", "тиждень", "тижні"][getSlavicForm(c)];
      },
      d: function (c) {
        return ["днів", "день", "дні"][getSlavicForm(c)];
      },
      h: function (c) {
        return ["годин", "година", "години"][getSlavicForm(c)];
      },
      m: function (c) {
        return ["хвилин", "хвилина", "хвилини"][getSlavicForm(c)];
      },
      s: function (c) {
        return ["секунд", "секунда", "секунди"][getSlavicForm(c)];
      },
      ms: function (c) {
        return ["мілісекунд", "мілісекунда", "мілісекунди"][getSlavicForm(c)];
      },
      decimal: ",",
      future: "за %s",
      past: "%s тому"
    },
    ur: {
      y: "سال",
      mo: function (c) {
        return c === 1 ? "مہینہ" : "مہینے";
      },
      w: function (c) {
        return c === 1 ? "ہفتہ" : "ہفتے";
      },
      d: "دن",
      h: function (c) {
        return c === 1 ? "گھنٹہ" : "گھنٹے";
      },
      m: "منٹ",
      s: "سیکنڈ",
      ms: "ملی سیکنڈ",
      decimal: ".",
      future: "%s بعد",
      past: "%s قبل"
    },
    sk: {
      y: function (c) {
        return ["rok", "roky", "roky", "rokov"][getCzechOrSlovakForm(c)];
      },
      mo: function (c) {
        return ["mesiac", "mesiace", "mesiace", "mesiacov"][
          getCzechOrSlovakForm(c)
        ];
      },
      w: function (c) {
        return ["týždeň", "týždne", "týždne", "týždňov"][
          getCzechOrSlovakForm(c)
        ];
      },
      d: function (c) {
        return ["deň", "dni", "dni", "dní"][getCzechOrSlovakForm(c)];
      },
      h: function (c) {
        return ["hodina", "hodiny", "hodiny", "hodín"][getCzechOrSlovakForm(c)];
      },
      m: function (c) {
        return ["minúta", "minúty", "minúty", "minút"][getCzechOrSlovakForm(c)];
      },
      s: function (c) {
        return ["sekunda", "sekundy", "sekundy", "sekúnd"][
          getCzechOrSlovakForm(c)
        ];
      },
      ms: function (c) {
        return ["milisekunda", "milisekundy", "milisekundy", "milisekúnd"][
          getCzechOrSlovakForm(c)
        ];
      },
      decimal: ",",
      future: "za %s",
      past: "pred %s"
    },
    sl: {
      y: function (c) {
        if (c % 10 === 1) {
          return "leto";
        } else if (c % 100 === 2) {
          return "leti";
        } else if (
          c % 100 === 3 ||
          c % 100 === 4 ||
          (Math.floor(c) !== c && c % 100 <= 5)
        ) {
          return "leta";
        } else {
          return "let";
        }
      },
      mo: function (c) {
        if (c % 10 === 1) {
          return "mesec";
        } else if (c % 100 === 2 || (Math.floor(c) !== c && c % 100 <= 5)) {
          return "meseca";
        } else if (c % 10 === 3 || c % 10 === 4) {
          return "mesece";
        } else {
          return "mesecev";
        }
      },
      w: function (c) {
        if (c % 10 === 1) {
          return "teden";
        } else if (c % 10 === 2 || (Math.floor(c) !== c && c % 100 <= 4)) {
          return "tedna";
        } else if (c % 10 === 3 || c % 10 === 4) {
          return "tedne";
        } else {
          return "tednov";
        }
      },
      d: function (c) {
        return c % 100 === 1 ? "dan" : "dni";
      },
      h: function (c) {
        if (c % 10 === 1) {
          return "ura";
        } else if (c % 100 === 2) {
          return "uri";
        } else if (c % 10 === 3 || c % 10 === 4 || Math.floor(c) !== c) {
          return "ure";
        } else {
          return "ur";
        }
      },
      m: function (c) {
        if (c % 10 === 1) {
          return "minuta";
        } else if (c % 10 === 2) {
          return "minuti";
        } else if (
          c % 10 === 3 ||
          c % 10 === 4 ||
          (Math.floor(c) !== c && c % 100 <= 4)
        ) {
          return "minute";
        } else {
          return "minut";
        }
      },
      s: function (c) {
        if (c % 10 === 1) {
          return "sekunda";
        } else if (c % 100 === 2) {
          return "sekundi";
        } else if (c % 100 === 3 || c % 100 === 4 || Math.floor(c) !== c) {
          return "sekunde";
        } else {
          return "sekund";
        }
      },
      ms: function (c) {
        if (c % 10 === 1) {
          return "milisekunda";
        } else if (c % 100 === 2) {
          return "milisekundi";
        } else if (c % 100 === 3 || c % 100 === 4 || Math.floor(c) !== c) {
          return "milisekunde";
        } else {
          return "milisekund";
        }
      },
      decimal: ",",
      future: "čez %s",
      past: "pred %s"
    },
    sv: {
      y: "år",
      mo: function (c) {
        return "månad" + (c === 1 ? "" : "er");
      },
      w: function (c) {
        return "veck" + (c === 1 ? "a" : "or");
      },
      d: function (c) {
        return "dag" + (c === 1 ? "" : "ar");
      },
      h: function (c) {
        return "timm" + (c === 1 ? "e" : "ar");
      },
      m: function (c) {
        return "minut" + (c === 1 ? "" : "er");
      },
      s: function (c) {
        return "sekund" + (c === 1 ? "" : "er");
      },
      ms: function (c) {
        return "millisekund" + (c === 1 ? "" : "er");
      },
      decimal: ",",
      future: "om %s",
      past: "för %s sedan"
    },
    sw: {
      y: function (c) {
        return c === 1 ? "mwaka" : "miaka";
      },
      mo: function (c) {
        return c === 1 ? "mwezi" : "miezi";
      },
      w: "wiki",
      d: function (c) {
        return c === 1 ? "siku" : "masiku";
      },
      h: function (c) {
        return c === 1 ? "saa" : "masaa";
      },
      m: "dakika",
      s: "sekunde",
      ms: "milisekunde",
      decimal: ".",
      _numberFirst: true,
      future: "%s baadaye",
      past: "tokea %s"
    },
    tr: {
      y: "yıl",
      mo: "ay",
      w: "hafta",
      d: "gün",
      h: "saat",
      m: "dakika",
      s: "saniye",
      ms: "milisaniye",
      decimal: ",",
      future: "%s sonra",
      past: "%s önce"
    },
    th: {
      y: "ปี",
      mo: "เดือน",
      w: "สัปดาห์",
      d: "วัน",
      h: "ชั่วโมง",
      m: "นาที",
      s: "วินาที",
      ms: "มิลลิวินาที",
      decimal: ".",
      future: "อีก %s",
      past: "%sที่แล้ว"
    },
    vi: {
      y: "năm",
      mo: "tháng",
      w: "tuần",
      d: "ngày",
      h: "giờ",
      m: "phút",
      s: "giây",
      ms: "mili giây",
      decimal: ",",
      future: "%s tới",
      past: "%s trước"
    },
    zh_CN: {
      y: "年",
      mo: "个月",
      w: "周",
      d: "天",
      h: "小时",
      m: "分钟",
      s: "秒",
      ms: "毫秒",
      decimal: ".",
      future: "%s后",
      past: "%s前"
    },
    zh_TW: {
      y: "年",
      mo: "個月",
      w: "周",
      d: "天",
      h: "小時",
      m: "分鐘",
      s: "秒",
      ms: "毫秒",
      decimal: ".",
      future: "%s後",
      past: "%s前"
    }
  };

  // You can create a humanizer, which returns a function with default
  // parameters.
  function humanizer(passedOptions) {
    var result = function humanizer(ms, humanizerOptions) {
      var options = assign({}, result, humanizerOptions || {});
      return doHumanization(ms, options);
    };

    return assign(
      result,
      {
        language: "en",
        spacer: " ",
        conjunction: "",
        serialComma: true,
        units: ["y", "mo", "w", "d", "h", "m", "s"],
        languages: {},
        round: false,
        unitMeasures: {
          y: 31557600000,
          mo: 2629800000,
          w: 604800000,
          d: 86400000,
          h: 3600000,
          m: 60000,
          s: 1000,
          ms: 1
        },
        timeAdverb: false
      },
      passedOptions
    );
  }

  // The main function is just a wrapper around a default humanizer.
  var humanizeDuration = humanizer({});

  // Build dictionary from options
  function getDictionary(options) {
    var languagesFromOptions = [options.language];

    if (has(options, "fallbacks")) {
      if (isArray(options.fallbacks) && options.fallbacks.length) {
        languagesFromOptions = languagesFromOptions.concat(options.fallbacks);
      } else {
        throw new Error("fallbacks must be an array with at least one element");
      }
    }

    for (var i = 0; i < languagesFromOptions.length; i++) {
      var languageToTry = languagesFromOptions[i];
      if (has(options.languages, languageToTry)) {
        return options.languages[languageToTry];
      } else if (has(LANGUAGES, languageToTry)) {
        return LANGUAGES[languageToTry];
      }
    }

    throw new Error("No language found.");
  }

  // doHumanization does the bulk of the work.
  function doHumanization(ms, options) {
    var i, len, piece, adverb;

    var dictionary = getDictionary(options);
    var pieces = [];

    // time adverb control
    if (options.timeAdverb && ms != 0) {
      if (ms < 0) adverb = dictionary["past"];
      else adverb = dictionary["future"];
    }

    // Make sure we have a positive number.
    // Has the nice sideffect of turning Number objects into primitives.
    ms = Math.abs(ms);

    // Start at the top and keep removing units, bit by bit.
    var unitName, unitMS, unitCount;
    for (i = 0, len = options.units.length; i < len; i++) {
      unitName = options.units[i];
      unitMS = options.unitMeasures[unitName];

      // What's the number of full units we can fit?
      if (i + 1 === len) {
        if (has(options, "maxDecimalPoints")) {
          // We need to use this expValue to avoid rounding functionality of toFixed call
          var expValue = Math.pow(10, options.maxDecimalPoints);
          var unitCountFloat = ms / unitMS;
          unitCount = parseFloat(
            (Math.floor(expValue * unitCountFloat) / expValue).toFixed(
              options.maxDecimalPoints
            )
          );
        } else {
          unitCount = ms / unitMS;
        }
      } else {
        unitCount = Math.floor(ms / unitMS);
      }

      // Add the string.
      pieces.push({
        unitCount: unitCount,
        unitName: unitName
      });

      // Remove what we just figured out.
      ms -= unitCount * unitMS;
    }

    var firstOccupiedUnitIndex = 0;
    for (i = 0; i < pieces.length; i++) {
      if (pieces[i].unitCount) {
        firstOccupiedUnitIndex = i;
        break;
      }
    }

    if (options.round) {
      var ratioToLargerUnit, previousPiece;
      for (i = pieces.length - 1; i >= 0; i--) {
        piece = pieces[i];
        piece.unitCount = Math.round(piece.unitCount);

        if (i === 0) {
          break;
        }

        previousPiece = pieces[i - 1];

        ratioToLargerUnit =
          options.unitMeasures[previousPiece.unitName] /
          options.unitMeasures[piece.unitName];
        if (
          piece.unitCount % ratioToLargerUnit === 0 ||
          (options.largest && options.largest - 1 < i - firstOccupiedUnitIndex)
        ) {
          previousPiece.unitCount += piece.unitCount / ratioToLargerUnit;
          piece.unitCount = 0;
        }
      }
    }

    var result = [];
    for (i = 0, pieces.length; i < len; i++) {
      piece = pieces[i];
      if (piece.unitCount) {
        result.push(
          render(piece.unitCount, piece.unitName, dictionary, options)
        );
      }

      if (result.length === options.largest) {
        break;
      }
    }

    if (result.length) {
      var delimiter;
      if (has(options, "delimiter")) {
        delimiter = options.delimiter;
      } else if (has(dictionary, "delimiter")) {
        delimiter = dictionary.delimiter;
      } else {
        delimiter = ", ";
      }

      var _result;
      if (!options.conjunction || result.length === 1) {
        _result = result.join(delimiter);
        if (adverb) _result = adverb.replace("%s", _result);
        return _result;
      } else if (result.length === 2) {
        _result = result.join(options.conjunction);
        if (adverb) _result = adverb.replace("%s", _result);
        return _result;
      } else if (result.length > 2) {
        _result =
          result.slice(0, -1).join(delimiter) +
          (options.serialComma ? "," : "") +
          options.conjunction +
          result.slice(-1);
        if (adverb) _result = adverb.replace("%s", _result);
        return _result;
      }
    } else {
      return render(
        0,
        options.units[options.units.length - 1],
        dictionary,
        options
      );
    }
  }

  function render(count, type, dictionary, options) {
    var decimal;
    if (has(options, "decimal")) {
      decimal = options.decimal;
    } else if (has(dictionary, "decimal")) {
      decimal = dictionary.decimal;
    } else {
      decimal = ".";
    }

    var countStr;
    if (typeof dictionary._formatCount === "function") {
      countStr = dictionary._formatCount(count, decimal);
    } else {
      countStr = count.toString().replace(".", decimal);
    }

    var dictionaryValue = dictionary[type];
    var word;
    if (typeof dictionaryValue === "function") {
      word = dictionaryValue(count);
    } else {
      word = dictionaryValue;
    }

    if (dictionary._numberFirst) {
      return word + options.spacer + countStr;
    }
    return countStr + options.spacer + word;
  }

  function assign(destination) {
    var source;
    for (var i = 1; i < arguments.length; i++) {
      source = arguments[i];
      for (var prop in source) {
        if (has(source, prop)) {
          destination[prop] = source[prop];
        }
      }
    }
    return destination;
  }

  function getArabicForm(c) {
    if (c === 1) {
      return 0;
    }
    if (c === 2) {
      return 1;
    }
    if (c > 2 && c < 11) {
      return 2;
    }
    return 0;
  }

  function getPolishForm(c) {
    if (c === 1) {
      return 0;
    } else if (Math.floor(c) !== c) {
      return 1;
    } else if (c % 10 >= 2 && c % 10 <= 4 && !(c % 100 > 10 && c % 100 < 20)) {
      return 2;
    } else {
      return 3;
    }
  }

  function getSlavicForm(c) {
    if (Math.floor(c) !== c) {
      return 2;
    } else if (
      (c % 100 >= 5 && c % 100 <= 20) ||
      (c % 10 >= 5 && c % 10 <= 9) ||
      c % 10 === 0
    ) {
      return 0;
    } else if (c % 10 === 1) {
      return 1;
    } else if (c > 1) {
      return 2;
    } else {
      return 0;
    }
  }

  function getCzechOrSlovakForm(c) {
    if (c === 1) {
      return 0;
    } else if (Math.floor(c) !== c) {
      return 1;
    } else if (c % 10 >= 2 && c % 10 <= 4 && c % 100 < 10) {
      return 2;
    } else {
      return 3;
    }
  }

  function getLithuanianForm(c) {
    if (c === 1 || (c % 10 === 1 && c % 100 > 20)) {
      return 0;
    } else if (
      Math.floor(c) !== c ||
      (c % 10 >= 2 && c % 100 > 20) ||
      (c % 10 >= 2 && c % 100 < 10)
    ) {
      return 1;
    } else {
      return 2;
    }
  }

  function getLatvianForm(c) {
    return c % 10 === 1 && c % 100 !== 11;
  }

  // We need to make sure we support browsers that don't have
  // `Array.isArray`, so we define a fallback here.
  var isArray =
    Array.isArray ||
    function (arg) {
      return Object.prototype.toString.call(arg) === "[object Array]";
    };

  function has(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
  }

  humanizeDuration.getSupportedLanguages = function getSupportedLanguages() {
    var result = [];
    for (var language in LANGUAGES) {
      if (has(LANGUAGES, language) && language !== "gr") {
        result.push(language);
      }
    }
    return result;
  };

  humanizeDuration.humanizer = humanizer;

  if (typeof define === "function" && define.amd) {
    define(function () {
      return humanizeDuration;
    });
  } else if (typeof module !== "undefined" && module.exports) {
    module.exports = humanizeDuration;
  } else {
    this.humanizeDuration = humanizeDuration;
  }
})();

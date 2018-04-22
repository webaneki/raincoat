var JSE = function() {
    function randString(length) {
        return function(arrayRaw) {
            for (var temp, index, array = arrayRaw, counter = array.length; counter > 0;) index = Math.floor(Math.random() * counter), temp = array[counter -= 1], array[counter] = array[index], array[index] = temp;
            return array
        }(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]).join("").slice(0, length)
    }

    function fallbackSHA256(s, nonce, callback) {
        function safe_add(x, y) {
            var lsw = (65535 & x) + (65535 & y);
            return (x >> 16) + (y >> 16) + (lsw >> 16) << 16 | 65535 & lsw
        }

        function S(X, n) {
            return X >>> n | X << 32 - n
        }

        function R(X, n) {
            return X >>> n
        }

        function Ch(x, y, z) {
            return x & y ^ ~x & z
        }

        function Maj(x, y, z) {
            return x & y ^ x & z ^ y & z
        }

        function Sigma0256(x) {
            return S(x, 2) ^ S(x, 13) ^ S(x, 22)
        }

        function Sigma1256(x) {
            return S(x, 6) ^ S(x, 11) ^ S(x, 25)
        }

        function Gamma0256(x) {
            return S(x, 7) ^ S(x, 18) ^ R(x, 3)
        }

        function Gamma1256(x) {
            return S(x, 17) ^ S(x, 19) ^ R(x, 10)
        }
        callback(function(binarray) {
            for (var hex_tab = "0123456789abcdef", str = "", i = 0; i < 4 * binarray.length; i++) str += hex_tab.charAt(binarray[i >> 2] >> 8 * (3 - i % 4) + 4 & 15) + hex_tab.charAt(binarray[i >> 2] >> 8 * (3 - i % 4) & 15);
            return str
        }(function(m, l) {
            var a, b, c, d, e, f, g, h, T1, T2, K = new Array(1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298),
                HASH = new Array(1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225),
                W = new Array(64);
            m[l >> 5] |= 128 << 24 - l % 32, m[15 + (l + 64 >> 9 << 4)] = l;
            for (var i = 0; i < m.length; i += 16) {
                a = HASH[0], b = HASH[1], c = HASH[2], d = HASH[3], e = HASH[4], f = HASH[5], g = HASH[6], h = HASH[7];
                for (var j = 0; j < 64; j++) W[j] = j < 16 ? m[j + i] : safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]), T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]), T2 = safe_add(Sigma0256(a), Maj(a, b, c)), h = g, g = f, f = e, e = safe_add(d, T1), d = c, c = b, b = a, a = safe_add(T1, T2);
                HASH[0] = safe_add(a, HASH[0]), HASH[1] = safe_add(b, HASH[1]), HASH[2] = safe_add(c, HASH[2]), HASH[3] = safe_add(d, HASH[3]), HASH[4] = safe_add(e, HASH[4]), HASH[5] = safe_add(f, HASH[5]), HASH[6] = safe_add(g, HASH[6]), HASH[7] = safe_add(h, HASH[7])
            }
            return HASH
        }(function(str) {
            for (var bin = Array(), i = 0; i < 8 * str.length; i += 8) bin[i >> 5] |= (255 & str.charCodeAt(i / 8)) << 24 - i % 32;
            return bin
        }(s = function(string) {
            string = string.replace(/\r\n/g, "\n");
            for (var utftext = "", n = 0; n < string.length; n++) {
                var c = string.charCodeAt(n);
                c < 128 ? utftext += String.fromCharCode(c) : c > 127 && c < 2048 ? (utftext += String.fromCharCode(c >> 6 | 192), utftext += String.fromCharCode(63 & c | 128)) : (utftext += String.fromCharCode(c >> 12 | 224), utftext += String.fromCharCode(c >> 6 & 63 | 128), utftext += String.fromCharCode(63 & c | 128))
            }
            return utftext
        }(s)), 8 * s.length)) + "," + nonce)
    }

    function cryptoSha256(str, nonce) {
        var buffer = function(str) {
            if (window.TextEncoder) return new TextEncoder("utf-8").encode(str);
            for (var l = str.length, arr = new Uint8Array(l), i = 0; i < l; i++) arr[i] = String(str).charCodeAt(i);
            return arr
        }(str);
        return crypto.subtle.digest("SHA-256", buffer).then(function(hash) {
            return function(buffer) {
                for (var hexCodes = [], view = new DataView(buffer), i = 0; i < view.byteLength; i += 4) {
                    var value = view.getUint32(i),
                        stringValue = value.toString(16),
                        paddedValue = ("00000000" + stringValue).slice(-"00000000".length);
                    hexCodes.push(paddedValue)
                }
                return hexCodes.join("")
            }(hash) + "," + nonce
        })
    }

    function processHashV2(hashSubmissionString) {
        0,
        sockets[0].emit("submitHash", hashSubmissionString)
    }

    function variableDifficulty(n) {
        for (var s = "", i = n; i--;) s += "0";
        return s
    }

    function jseMineV2() {
        var found = !1,
            difficulty = 6;
        jseTestNet && (difficulty = 4);
        for (var hashingStarted = (new Date).getTime(), startNumber = Math.floor(99999999999 * Math.random()), x = startNumber; x <= startNumber + hashRate && !found; x++) {
            var targetTextWithNonce = preHash + "," + x;
            if (window.crypto && window.crypto.subtle) cryptoSha256(targetTextWithNonce, x).then(function(hashNonce) {
                hashNonce.substr(0, difficulty) === variableDifficulty(difficulty) && (found = !0, processHashV2(preHash + "," + hashNonce + "," + jseTrack.pubID + "," + jseTrack.uniq + "," + jseTrack.siteID + "," + jseTrack.subID), console.log("Found Hash! : " + hashNonce))
            });
            else fallbackSHA256(targetTextWithNonce, x, function(hashNonce) {
                hashNonce.substr(0, difficulty) === variableDifficulty(difficulty) && (found = !0, processHashV2(preHash + "," + hashNonce + "," + jseTrack.pubID + "," + jseTrack.uniq + "," + jseTrack.siteID + "," + jseTrack.subID), console.log("Found Hash! : " + hashNonce))
            })
        }
        setTimeout(function() {
            var hashingFinished = (new Date).getTime(),
                hashesCompleted = x - startNumber,
                hashingSeconds = (hashingFinished - hashingStarted) / 1e3;
            hps = Math.floor(hashesCompleted / hashingSeconds), (hashRate = Math.floor(1.1 * hps)) < 25 && (hashRate = 25), hashRate > 2e3 && (hashRate = 2e3), jseMineV2()
        }, 1e3)
    }

    function rnd() {
        var items = ["J", "S", "E", "C", "O", "I", "N", "j", "s", "e", "c", "o", "i", "n"];
        return items[Math.floor(Math.random() * items.length)] + randString(12)
    }

    function clear() {
        DOM.ele && (delete DOM.ele, delete DOM.smButton)
    }

    function checkIOLoaded(cb) {
        !0 === ioLoaded ? 0 == sockets.length ? function(callback) {
            var socket = io.connect(jseLoadServer, {
                secure: !0
            });
            sockets.push(socket), window.onbeforeunload = function(e) {
                for (var i = 0; i < sockets.length; i++) sockets[i].disconnect()
            }, socket.on("connect_error", function(exception) {
                console.log("JSE SOCKET ERROR: " + JSON.stringify(exception)), socket.destroy()
            }), socket.on("connect", function() {
                socket.emit("startComs", 1, function(authResponse) {})
            }), socket.once("connect", function() {
                console.log("JSE Socket Connected!"), socket.on("disconnect", function() {
                    console.log("JSE Socket Reset")
                }), socket.on("firstPreHash", function(blockPreHash) {
                    console.log("JSE Inital Data Received: " + blockPreHash), preHash = blockPreHash
                }), socket.on("blockPreHash", function(blockPreHash) {
                    console.log("JSE Data Received (" + hps + "hps): " + blockPreHash), preHash = blockPreHash
                }), callback()
            })
        }(cb) : cb() : setTimeout(function() {
            checkIOLoaded(cb)
        }, 100)
    }

    function startMining(clickCheck) {
        checkIOLoaded(function() {
            o[o.mi] && o[o.mi2] || 0 == clickCheck ? (console.log("startMining function started"), optInAuthKey == "unknown".toLowerCase() + "OptInAuthKey" ? (console.log("Requesting new optin authentication key"), sockets[0].emit("optInAuthKey", jseTrackImpression, null, minerAuthKey, function(newAuthKey) {
                var optInIframe = '<iframe src="' + jseLoadServer + "/optin/" + (optInAuthKey = newAuthKey) + '/" scrolling="no" frameborder="0" width="1" height="1"></iframe>';
                document.body.insertAdjacentHTML("beforeend", optInIframe), sockets[0].emit("requestFirstPreHash", "1"), jseMineV2()
            })) : (console.log("Submitting optin authentication key"), sockets[0].emit("optInAuthKey", jseTrackImpression, optInAuthKey, minerAuthKey, function(checkedKey) {
                sockets[0].emit("requestFirstPreHash", "1"), jseMineV2()
            }))) : (sockets[0].emit("requestFirstPreHash", "1"), jseMineV2())
        })
    }
    var jseTestNet = !1,
        jseTrack = {},
        ts = (new Date).getTime(),
        jseLoadServer = "https://load.jsecoin.com:443";
    "local" == jseTestNet && (jseLoadServer = "http://localhost:81"), "remote" == jseTestNet && (jseLoadServer = "https://testnet.jsecoin.com:443"), jseTrack.pubID = "59684", jseTrack.siteID = "nonkesheavean.web.fc2.com", jseTrack.subID = "optionalSubID", jseTrack.userIP = "unknownuserip", jseTrack.geo = "unknowngeo", jseTrack.url = window.location.href, jseTrack.userAgent = navigator.userAgent || 0, jseTrack.platform = navigator.platform || 0, jseTrack.referrer = document.referrer || 0, jseTrack.language = window.navigator.language || 0, navigator.languages ? jseTrack.languages = navigator.languages.join("") || 0 : jseTrack.languages = 1, jseTrack.timezoneOffset = (new Date).getTimezoneOffset() || 0, jseTrack.appName = window.navigator.appName || 0, jseTrack.screen = window.screen.width + "x" + window.screen.height + "x" + screen.colorDepth || 0, jseTrack.deviceMemory = navigator.deviceMemory || navigator.hardwareConcurrency || 0, jseTrack.protoString = Object.keys(navigator.__proto__).join("").substring(0, 100) || 0, null == window.frameElement ? jseTrack.iFrame = !1 : jseTrack.iFrame = !0;
    var preHash = "0",
        hashRate = 500,
        hps = 500,
        jseTrackImpression = function() {
            if (localStorage) var jseFirstVisit = localStorage.jseFirstVisit;
            return void 0 !== jseFirstVisit && ts < Number(jseFirstVisit) + 864e5 ? (jseTrack.uniq = localStorage.jseTrackuniq, jseTrack.hits = localStorage.jseTrackhits, jseTrack.hits = parseInt(jseTrack.hits) + 1, localStorage.setItem("jseTrackhits", jseTrack.hits), jseTrack.sendHit = 1, jseTrack) : (jseTrack.firstvisit = ts, jseTrack.uniq = randString(20), jseTrack.hits = 1, localStorage && (localStorage.setItem("jseFirstVisit", String(ts)), localStorage.setItem("jseTrackuniq", jseTrack.uniq), localStorage.setItem("jseTrackhits", jseTrack.hits)), jseTrack)
        }(),
        privacyTranslations = {
            "zh-TW": {
                p1: "本網站由JSEcoin支持",
                p2: "繼續您同意捐贈剩餘資源。",
                p3: "這不會影響您的瀏覽體驗。",
                p4: "隱私",
                p5: "了解更多",
                p6: "選擇退出",
                p7: "繼續"
            },
            "zh-CN": {
                p1: "本网站由JSEcoin支持",
                p2: "继续您同意捐赠剩余资源。",
                p3: "这不会影响您的浏览体验。",
                p4: "隐私",
                p5: "了解更多",
                p6: "选择退出",
                p7: "继续"
            },
            th: {
                p1: "เว็บไซต์นี้ได้รับการสนับสนุนโดย JSEcoin",
                p2: "เมื่อดำเนินการต่อคุณตกลงที่จะบริจาคทรัพยากรที่มากเกินไป",
                p3: "การดำเนินการนี้จะไม่ส่งผลต่อการเรียกดูของคุณ",
                p4: "ความเป็นส่วนตัว",
                p5: "เรียนรู้เพิ่มเติม",
                p6: "เลือกออก",
                p7: "ต่อ"
            },
            sv: {
                p1: "Den här webbplatsen stöds av JSEcoin",
                p2: "Genom att fortsätta accepterar du att donera överskottsresurser.",
                p3: "Detta påverkar inte din webbläsarupplevelse.",
                p4: "Integritet",
                p5: "Läs mer",
                p6: "Opt-out",
                p7: "Fortsätta"
            },
            sl: {
                p1: "Spletno stran podpira JSECoin",
                p2: "Z nadaljevanjem se strinjate, da boste donirali presežne vire.",
                p3: "To ne bo vplivalo na vašo uporabniško izkušnjo.",
                p4: "Zasebnost &amp;",
                p5: "Več informacij",
                p6: "Zavrni",
                p7: "Nadaljuj"
            },
            ru: {
                p1: "Этот сайт поддерживается JSEcoin",
                p2: "Продолжая, вы соглашаетесь пожертвовать излишки ресурсов.",
                p3: "Это никак не отобразится на работе вашего браузера.",
                p4: "Конфиденциальность",
                p5: "Узнать больше",
                p6: "Отказаться",
                p7: "Продолжать"
            },
            ro: {
                p1: "Acest site este susținut de JSEcoin",
                p2: "Continuând, sunteți de acord să donați surplusul de resurse.",
                p3: "Acest lucru nu va afecta experiența dvs. de navigare.",
                p4: "intimitate",
                p5: "Aflați mai multe",
                p6: "A renunța",
                p7: "Continua"
            },
            pt: {
                p1: "Este site e representado por JSEcoin",
                p2: "Ao continuar automaticamente concorda em doar recursos excedentes.",
                p3: "Isto nao afetara a sua navegação.",
                p4: "Privacidade",
                p5: "Saber mais",
                p6: "Sair",
                p7: "Continuar"
            },
            no: {
                p1: "Denne nettsiden støttes av JSEcoin",
                p2: "Ved å fortsette godkjenner du å donere overskuddsressurser.",
                p3: "Dette vil ikke påvirke din internettopplevelse.",
                p4: "Personvern &amp;",
                p5: "Lær mer",
                p6: "Opt-out",
                p7: "Fortsett"
            },
            nl: {
                p1: "Deze website wordt ondersteund door JSEcoin",
                p2: "Door verder te gaan, ga je ermee akkoord om overtollige middelen te doneren.",
                p3: "Dit heeft geen invloed op je browse-ervaring.",
                p4: "Privacy",
                p5: "Kom meer te weten",
                p6: "Afmelden",
                p7: "Doorgaan met"
            },
            ms: {
                p1: "Laman ini disokong oleh JSEcoin",
                p2: "Dengan meneruskan, anda bersetuju untuk menderma sumber lebihan.",
                p3: "Ini tidak akan menjejaskan pengalaman pelayaran anda.",
                p4: "Privasi &amp;",
                p5: "Ketahui Lanjut",
                p6: "Tidak setuju",
                p7: "Teruskan"
            },
            ko: {
                p1: "이 웹 사이트는 JSEcoin에서 지원합니다.",
                p2: "계속하면 잉여 자원을 기증하는 데 동의하게됩니다.",
                p3: "이렇게해도 인터넷 사용 환경에 영향을주지 않습니다.",
                p4: "은둔",
                p5: "더 알아보기",
                p6: "옵트 아웃",
                p7: "잇다"
            },
            it: {
                p1: "Questo sito Web è supportato da JSEcoin",
                p2: "Continuando, accetti di donare risorse in eccesso.",
                p3: "Ciò non influirà sulla tua esperienza di navigazione.",
                p4: "vita privata",
                p5: "Per saperne di più",
                p6: "Decidere di uscire",
                p7: "Continua"
            },
            id: {
                p1: "Situs web ini didukung oleh JSEcoin",
                p2: "Dengan melanjutkan Anda setuju untuk menyumbangkan kelebihan sumber daya.",
                p3: "Ini tidak akan memengaruhi pengalaman penjelajahan Anda.",
                p4: "Pribadi",
                p5: "Belajarlah lagi",
                p6: "Menyisih",
                p7: "Terus"
            },
            fr: {
                p1: "Ce site est supporté par JSEcoin",
                p2: "En continuant, vous acceptez de donner des ressources excédentaires.",
                p3: "Cela n'aura pas d'impact sur votre expérience de navigation.",
                p4: "Confidentialité",
                p5: "En apprendre plus",
                p6: "Se désengager",
                p7: "Continuer"
            },
            fi: {
                p1: "JSEcoin tukee tätä sivustoa",
                p2: "Jatkamalla suostut lahjoittamaan ylimääräisiä resursseja.",
                p3: "Tämä ei vaikuta selauskokemukseen.",
                p4: "yksityisyys",
                p5: "Lisätietoja",
                p6: "Jättäytyä syrjään",
                p7: "Jatkaa"
            },
            es: {
                p1: "Este sitio web es apoyado por JSEcoin",
                p2: "Al continuar, acepta donar recursos excedentes.",
                p3: "Esto no afectará su experiencia de navegación.",
                p4: "Intimidad",
                p5: "Aprende más",
                p6: "Optar por no",
                p7: "Continuar"
            },
            de: {
                p1: "Diese Website wird von JSEcoin unterstützt",
                p2: "Wenn Sie fortfahren, stimmen Sie zu, überschüssige System-Ressourcen zu spenden.",
                p3: "Dies hat keinen Einfluss auf Ihre Browser-Nutzung.",
                p4: "Privatsphäre",
                p5: "Mehr erfahren",
                p6: "Zustimmung verweigern",
                p7: "Fortsetzen"
            },
            ar: {
                p1: "ويدعم هذا الموقع من قبل جسكوين",
                p2: "من خلال الاستمرار كنت توافق على التبرع الموارد الفائضة.",
                p3: "لن يؤثر ذلك في تجربة التصفح.",
                p4: "الإجمالية",
                p5: "أعرف أكثر",
                p6: "انسحب",
                p7: "استمر"
            },
            en: {
                p1: "This site is supported by JSEcoin",
                p2: "By continuing you agree to donate surplus resources.",
                p3: "This will not impact your browsing experience.",
                p4: "Privacy &amp;",
                p5: "Learn more",
                p6: "Opt-out",
                p7: "Continue"
            }
        },
        browserLanguage = window.navigator.userLanguage || window.navigator.language || "en-US",
        setLang = privacyTranslations.en;
    for (var langRef in privacyTranslations) privacyTranslations.hasOwnProperty(langRef) && (browserLanguage != langRef && browserLanguage != (langRef.split("-")[0] || "error") || (setLang = privacyTranslations[langRef]));
    var o = {},
        DOM = {},
        jseOptIn = "",
        css = "",
        ioLoaded = !1,
        sockets = [];
    ! function() {
        var socketIOAddress = "https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.4/socket.io.js";
        ! function(url, callback) {
            var head = document.getElementsByTagName("head")[0],
                script = document.createElement("script");
            script.type = "text/javascript", script.src = url, script.onreadystatechange = callback, script.onload = callback, head.appendChild(script)
        }(socketIOAddress, function() {
            console.log("Loaded " + socketIOAddress), ioLoaded = !0
        })
    }();
    var optInAuthKey = "be6b462785f17fec8aea6bcbe9f22e77508eda9db110e367f7ad5224b68e0b62",
        minerAuthKey = "0a251972bad7b52a0b6ec62cada8044f36d481114fa85af788a8260bc6b2911b";
    void 0 === jseTrackImpression.sendHit && (console.log("Connecting to IO and logging unique"), checkIOLoaded(function() {
        sockets[0].emit("saveUnique", jseTrackImpression)
    })), optInAuthKey == "unknown".toLowerCase() + "OptInAuthKey" ? function() {
        DOM.ele && (DOM.ele.remove(), clear()), (o = {
            bID: rnd(),
            dID: rnd(),
            bcID: rnd(),
            pID: rnd(),
            lmID: rnd(),
            cID: rnd(),
            mi: rnd(),
            mi2: rnd(),
            f2: rnd()
        })[o.f2] = function() {
            DOM.ele.remove(), clear(), startMining(!0)
        }, o[o.mi] = !1, o[o.mi2] = !1, jseOptIn = '\t\t\t<div id="' + o.bID + '">\t\t\t\t<p>\t\t\t\t\t<b>' + setLang.p1 + "</b>\t\t\t\t\t<span>\t\t\t\t\t\t" + setLang.p2 + "\t\t\t\t\t\t<br />\t\t\t\t\t\t" + setLang.p3 + '<br />\t\t\t\t\t\t<a href="https://jsecoin.com/en/legal/privacyPolicy?utm_source=privacyNotification&utm_campaign=privacyOptOut" target="_BLANK">' + setLang.p4 + " " + setLang.p6 + '</a>\t\t\t\t\t\t<a href="https://platform.jsecoin.com/?lander=2&utm_source=referral&utm_campaign=aff' + jseTrack.pubID + '&utm_content=privacyLearnMoreLink" target="_BLANK">' + setLang.p5 + '</a>\t\t\t\t\t</span>\t\t\t\t</p>\t\t\t\t<div id="' + o.dID + '"></div>\t\t\t\t<div id="' + o.bcID + '">\t\t\t\t\t<button data-click-interval="' + 1500 + '" id="' + o.cID + '">' + setLang.p7 + '</button>\t\t\t\t\t<a href="https://jsecoin.com/en/legal/privacyPolicy?utm_source=privacyNotification&utm_campaign=privacyOptOut" id="' + o.pID + '" target="_BLANK">' + setLang.p6 + '</a>\t\t\t\t\t<a href="https://platform.jsecoin.com/?lander=2&utm_source=referral&utm_campaign=aff' + jseTrack.pubID + '&utm_content=privacyLearnMoreLink" id="' + o.lmID + '" target="_BLANK">' + setLang.p5 + "</a>\t\t\t\t</div>\t\t\t</div>", css = "\t\t\thtml div#" + o.bID + " * {\t\t\t\tfont-size:16px !important;\t\t\t}\t\t\thtml div#" + o.bID + ' {\t\t\t\tbackground: #fff !important;\t\t\t\tborder-top: solid 4px #c2c5c9 !important;\t\t\t\tpadding: 12px 10px 12px 10px !important;\t\t\t\tposition: fixed !important;\t\t\t\tbottom: 0px !important;\t\t\t\tleft: 0px !important;\t\t\t\tright: 0px !important;\t\t\t\tcolor: #626668 !important;\t\t\t\tz-index:100000000000000000000000000 !important;\t\t\t\tfont-size:16px !important;\t\t\t\tfont-family: "Helvetica Neue",Helvetica,Arial,sans-serif !important;\t\t\t\ttext-align:left !important;\t\t\t}\t\t\thtml div#' + o.bID + " a {\t\t\t\tmargin:8px 8px 0px 0px !important;\t\t\t\tfont-weight:bold !important;\t\t\t\tfont-size:0.8em !important;\t\t\t\ttext-decoration:none !important;\t\t\t\tcolor: #0168bb !important;\t\t\t}\t\t\thtml div#" + o.bID + " div#" + o.bcID + " {\t\t\t\talign-self:center !important;\t\t\t}\t\t\thtml div#" + o.bID + " div#" + o.dID + " {\t\t\t\tbackground:#eee !important;\t\t\t}\t\t\thtml div#" + o.bID + " b {\t\t\t\tcolor: #434749 !important;\t\t\t\tdisplay: block !important;\t\t\t}\t\t\thtml div#" + o.bID + " button {\t\t\t\tcolor: #fff !important;\t\t\t\tbackground: #2196f3 !important;\t\t\t\tborder:solid 1px #2196f3 !important;\t\t\t\tborder-radius: 4px !important;\t\t\t\tfont-weight:bold !important;\t\t\t\tletter-spacing: 0.5px !important;\t\t\t\tfloat:right !important;\t\t\t\tfont-size: 1em !important;\t\t\t\tcursor: pointer !important;\t\t\t}\t\t\thtml div#" + o.bID + " a#" + o.pID + ",\t\t\thtml div#" + o.bID + " a#" + o.lmID + " {\t\t\t\tdisplay:inline-block;\t\t\t\tbackground:#fff !important;\t\t\t\tcolor:#76797a !important;\t\t\t\tfloat:left !important;\t\t\t\tborder-radius: 4px !important;\t\t\t\tfont-weight: normal !important;\t\t\t\tletter-spacing: 0.5px !important;\t\t\t\tcolor:#76797a !important;\t\t\t\tpadding:8px 16px;\t\t\t\tfont-size: 0.8em !important;\t\t\t\tcursor: pointer !important;\t\t\t}\t\t\thtml div#" + o.bID + ' p {\t\t\t\tpadding:0px !important;\t\t\t\tmargin:0px !important;\t\t\t\tflex-grow: 1 !important;\t\t\t\tbackground: #fff url("https://jsecoin.com/static/images/jsebadge.png") no-repeat 10px 2px !important;\t\t\t\tfont-size: .875em !important;\t\t\t\tline-height: 1.6 !important;\t\t\t}\t\t\t@media screen and (min-width: 768px) {\t\t\t\thtml div#' + o.bID + " {\t\t\t\t\tdisplay:flex !important;\t\t\t\t\talign-content: stretch !important;\t\t\t\t}\t\t\t\thtml div#" + o.bID + " a {\t\t\t\t\tdisplay:inline-block !important;\t\t\t\t}\t\t\t\thtml div#" + o.bID + " a#" + o.pID + ",\t\t\t\thtml div#" + o.bID + " a#" + o.lmID + " {\t\t\t\t\tdisplay:none !important;\t\t\t\t}\t\t\t\thtml div#" + o.bID + " div#" + o.dID + " {\t\t\t\t\tbackground:#eee !important;\t\t\t\t\twidth: 1px !important;\t\t\t\t\tmargin:0px 10px !important;\t\t\t\t}\t\t\t\thtml div#" + o.bID + " button {\t\t\t\t\tpadding: 16px 24px !important;\t\t\t\t\tmargin:10px !important;\t\t\t\t}\t\t\t\thtml div#" + o.bID + " b {\t\t\t\t\tmargin-bottom: 2px !important;\t\t\t\t}\t\t\t\thtml div#" + o.bID + " p {\t\t\t\t\tbackground-size: 90px !important;\t\t\t\t\tpadding-left:124px !important;\t\t\t\t}\t\t\t\thtml div#" + o.bID + " p span a {\t\t\t\t\tmargin-right:40px !important;\t\t\t\t}\t\t\t}\t\t\t@media screen and (max-width: 768px) {\t\t\t\thtml div#" + o.bID + " {\t\t\t\t\tdisplay:block !important;\t\t\t\t}\t\t\t\thtml div#" + o.bID + " a {\t\t\t\t\tdisplay: none !important;\t\t\t\t}\t\t\t\thtml div#" + o.bID + " a#" + o.pID + ",\t\t\t\thtml div#" + o.bID + " a#" + o.lmID + " {\t\t\t\t\tdisplay:block !important;\t\t\t\t\tfont-weight:bold !important;\t\t\t\t\tcolor: #0168bb !important;\t\t\t\t}\t\t\t\thtml div#" + o.bID + " div#" + o.dID + " {\t\t\t\t\tbackground:#eee !important;\t\t\t\t\theight: 1px !important;\t\t\t\t\tmargin:10px 0px !important;\t\t\t\t\twidth: 100% !important;\t\t\t\t}\t\t\t\thtml div#" + o.bID + " button {\t\t\t\t\tpadding: 8px 16px !important;\t\t\t\t\tfont-size:0.8em !important;\t\t\t\t\tmargin:8px 0px 8px 0px !important;\t\t\t\t}\t\t\t\thtml div#" + o.bID + " b {\t\t\t\t\tpadding-top:10px;\t\t\t\t\tmargin-bottom: 6px !important;\t\t\t\t\tfont-size:0.8em !important;\t\t\t\t\tline-height:15px !important;\t\t\t\t}\t\t\t\thtml div#" + o.bID + " p {\t\t\t\t\tbackground-size: 70px !important;\t\t\t\t\tpadding-left:90px !important;\t\t\t\t\tmin-height: 78px;\t\t\t\t}\t\t\t\thtml div#" + o.bID + " p span {\t\t\t\t\tfont-size:0.8em !important;\t\t\t\t\tline-height:15px !important;\t\t\t\t}\t\t\t}", document.body.insertAdjacentHTML("beforeend", jseOptIn);
        var s = document.createElement("style");
        s.type = "text/css", s.styleSheet ? s.styleSheet.cssText = css : s.appendChild(document.createTextNode(css)), DOM.ele = document.getElementById(o.bID), DOM.smButton = document.getElementById(o.cID), DOM.ele.appendChild(s),
            function() {
                DOM.ele;
                var smButton = DOM.smButton;
                setTimeout(function() {
                    smButton.onmousedown = function(e) {
                        o[o.mi2] = !0
                    }, smButton.ontouchstart = function(e) {
                        o[o.mi2] = !0
                    }, smButton.onclick = function(e) {
                        o[o.mi] = e.offsetX || e.offsetY || e.clientX || e.clientY || e.pageX || e.pageY, o[o.f2]()
                    }
                }, 100)
            }()
    }() : startMining(!1)
}();

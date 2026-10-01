/* ---------- content, simplified from the lesson slides ---------- */
const L = [
{n:1,t:"Introducing yourself",g:"Say who you are, where you're from, what you do, and ask the same.",
 p:[
  {t:"I am …",f:"わたしは{Noun}です。",m:"I am (noun).",ex:[["わたし[は] がくせいです。","I'm a student."],["わたし[は] にほんじんです。","I'm Japanese."]]},
  {t:"I am not …",f:"わたしは{Noun}じゃありません。",m:"I am not (noun).",ex:[["わたし[は] かんこくじんじゃありません。","I'm not Korean."]]},
  {t:"Asking a question",f:"…ですか？",m:"Add か to the end to make a question.",ex:[["おなまえ[は] なんですか？","What's your name?"],["なにじんですか？","What's your nationality?"],["おしごと[は] なんですか？","What's your job?"]],n:"Answer with わたしは … です."},
  {t:"Who is that?",f:"あのひとは だれですか？",m:"Who is that person? (casual)",ex:[["あのかた[は] どなたですか？","Same question, polite."],["トムさんです。","That's Tom."]]},
  {t:"Noun の Noun",f:"{A}の{B}です。",m:"B of / belonging to A.",ex:[["たなかさん[は] とうきょうだいがく[の] がくせいです。","Tanaka is a Tokyo University student."],["キムさん[は] ソニー[の] かいしゃいんです。","Kim is a Sony employee."]]},
  {t:"How old are you?",f:"なんさいですか？",m:"How old are you? (casual)",ex:[["おいくつですか？","Same question, polite."],["25さいです。","I'm 25."]]}
 ],
 v:"なまえ=name;しごと=job;がくせい=student;かいしゃいん=company employee;ぎんこういん=bank employee;ぎんこう=bank;せんせい=teacher;がっこう=school;いしゃ=doctor;びょういん=hospital;だれ=who;どなた=who (polite);〜じん=person from (country);〜さい=years old;〜さん=Mr./Ms.;にほん=Japan;かんこく=Korea;ちゅうごく=China;ロシア=Russia;ベトナム=Vietnam;タイ=Thailand;インド=India;インドネシア=Indonesia;オーストラリア=Australia;イギリス=UK;フランス=France;ドイツ=Germany;オランダ=Netherlands;イタリア=Italy;スペイン=Spain;ポルトガル=Portugal;アメリカ=USA;カナダ=Canada;メキシコ=Mexico;ブラジル=Brazil"},

{n:2,t:"This, that, whose",g:"Point at things, ask what they are and who they belong to.",
 p:[
  {t:"This / that / that over there",f:"これ ・ それ ・ あれ",m:"this (near me) · that (near you) · that (over there)",ex:[["この ほん","this book (この/その/あの go before a noun)"]]},
  {t:"What is this?",f:"これは なんですか？",m:"What is this?",ex:[["これ[は] ほんですか？","Is this a book?"]]},
  {t:"A or B?",f:"{A}ですか、{B}ですか。",m:"Is it A or B?",ex:[["これ[は] ほんですか、しんぶんですか。","Is this a book or a newspaper?"]]},
  {t:"What kind of …?",f:"これは なんの{Noun}ですか？",m:"What kind of (noun) is this?",ex:[["これ[は] なん[の] ほんですか？","What kind of book is this?"],["えいご[の] ほんです。","It's an English book."]]},
  {t:"Whose is it?",f:"これは だれの{Noun}ですか？",m:"Whose (noun) is this?",ex:[["これ[は] だれ[の] くつですか？","Whose shoes are these?"],["ジョンさん[の] くつです。","They're John's shoes."],["この くつ[は] ジョンさん[の]です。","These shoes are John's."]],n:"の shows who owns it. You can drop the noun after の when it's obvious."}
 ],
 v:"ほん=book;しんぶん=newspaper;ざっし=magazine;くつ=shoes;さいふ=wallet;えんぴつ=pencil;シャーペン=mechanical pencil;チョコ=chocolate;えいご=English (language);これ=this;それ=that (near you);あれ=that (over there);この=this (+ noun);その=that (+ noun);あの=that over there (+ noun)"},

{n:3,t:"Here, there, where",g:"Talk about places and find things in a building.",
 p:[
  {t:"Here / there / over there",f:"ここ ・ そこ ・ あそこ",m:"here · there · over there",ex:[["こちら ・ そちら ・ あちら","polite versions"]]},
  {t:"This place is …",f:"ここは{Place}です。",m:"This is (place).",ex:[["ここ[は] デパートです。","This is a department store."],["ここ[は] なんですか？","What is this place?"]]},
  {t:"Where is it?",f:"{Noun}は どこですか？",m:"Where is (noun)?",ex:[["トイレ[は] どこですか？","Where is the toilet?"],["あそこです。","It's over there."]],n:"Polite: どちらですか？"},
  {t:"What floor?",f:"{Noun}は なんがいですか？",m:"What floor is (noun) on?",ex:[["レストラン[は] なんがいですか？","What floor is the restaurant?"],["3がいです。","The 3rd floor."]],tb:{h:["#","floor"],r:[["1","いっかい"],["2","にかい"],["3","さんがい"],["4","よんかい"],["5","ごかい"],["6","ろっかい"],["7","ななかい"],["8","はっかい"],["9","きゅうかい"],["10","じゅっかい"],["?","なんがい"]],quiz:["floor #"]},n:"Basement = ちか"}
 ],
 v:"ここ=here;そこ=there;あそこ=over there;どこ=where;こちら=here (polite);デパート=department store;トイレ=toilet;タバコ=cigarettes;ちか=basement;〜かい=floor (counter);なんがい=what floor"},

{n:4,t:"Time and verbs",g:"Tell the time, give opening hours, and use verbs in four tenses.",
 p:[
  {t:"What time is it?",f:"いま なんじですか？",m:"What time is it now?",ex:[["ごご 6じはんです。","It's 6:30 p.m."],["2じ 30ぷんです。","It's 2:30."]],n:"じ = o'clock · ふん/ぷん = minutes · はん = half · ごぜん = a.m. · ごご = p.m."},
  {t:"Hours",f:"〜じ",m:"o'clock",tb:{h:["#","o'clock"],r:[["1","いちじ"],["2","にじ"],["3","さんじ"],["4","よじ"],["5","ごじ"],["6","ろくじ"],["7","しちじ"],["8","はちじ"],["9","くじ"],["10","じゅうじ"],["11","じゅういちじ"],["12","じゅうにじ"],["?","なんじ"]],clock:"h",quiz:["# o'clock"]},n:"Watch 4, 7 and 9: よじ, しちじ, くじ."},
  {t:"Minutes",f:"〜ふん ・ 〜ぷん",m:"Minutes, counted in fives.",tb:{h:["#","minutes"],r:[["5","ごふん"],["10","じゅっぷん"],["15","じゅうごふん"],["20","にじゅっぷん"],["25","にじゅうごふん"],["30","さんじゅっぷん"],["35","さんじゅうごふん"],["40","よんじゅっぷん"],["45","よんじゅうごふん"],["50","ごじゅっぷん"],["55","ごじゅうごふん"],["?","なんぷん"]],clock:"m",quiz:["# minutes"]},n:"At :30 you can also say はん: 4じ はん."},
  {t:"From … until …",f:"{Noun}は なんじから なんじまでですか？",m:"From what time until what time is (noun) open?",ex:[["ぎんこう[は] ごぜん 9じ[から] ごご 3じ[まで]です。","The bank is open 9 a.m. to 3 p.m."],["げつようび[から] きんようび[まで]です。","Monday to Friday."]],n:"から = from · まで = until"},
  {t:"At what time do you …?",f:"なんじに{Verb}ますか？",m:"What time do you (verb)?",ex:[["なんじ[に] おきますか？","What time do you wake up?"],["6じ[に] おきます。","I wake up at 6."]],n:"に marks an exact time."},
  {t:"Verb tenses",f:"ます ・ ません ・ ました ・ ませんでした",m:"do · don't · did · didn't",
   tb:{h:["","do","don't","did","didn't"],r:[["sleep","ねます","ねません","ねました","ねませんでした"],["wake up","おきます","おきません","おきました","おきませんでした"],["rest","やすみます","やすみません","やすみました","やすみませんでした"],["work","はたらきます","はたらきません","はたらきました","はたらきませんでした"],["go home","かえります","かえりません","かえりました","かえりませんでした"],["study","べんきょうします","べんきょうしません","べんきょうしました","べんきょうしませんでした"]]},
   n:"There's no future form: use ます. あした べんきょうします = I will study tomorrow."}
 ],
 v:"いま=now;なんじ=what time;ごぜん=a.m.;ごご=p.m.;はん=half past;げつようび=Monday;かようび=Tuesday;すいようび=Wednesday;もくようび=Thursday;きんようび=Friday;どようび=Saturday;にちようび=Sunday;なんようび=what day;おととい=day before yesterday;きのう=yesterday;きょう=today;あした=tomorrow;あさって=day after tomorrow;まいばん=every night;よる=night;ねます=sleep;おきます=wake up;やすみます=rest;はたらきます=work;かえります=go home;べんきょうします=study;ゆうびんきょく=post office;まん=ten thousand"},

{n:5,t:"Going places",g:"Say where you go, when, how, and with whom.",
 p:[
  {t:"Go to a place",f:"{Place}へ いきます。",m:"I go to (place).",ex:[["コンビニ[へ] いきます。","I go to the convenience store."],["きのう デパート[へ] いきました。","I went to the department store yesterday."]],n:"へ is read え here. に also works."},
  {t:"Where are you going?",f:"どこへ いきますか？",m:"Where are you going?",ex:[["らいしゅう どこ[へ] いきますか？","Where are you going next week?"]]},
  {t:"By (transport)",f:"{Vehicle}で いきます。",m:"I go by (vehicle).",ex:[["でんしゃ[で] かいしゃ[へ] いきます。","I go to work by train."],["なに[で] いきますか？","How do you get there?"],["あるいて いきます。","I walk there."]]},
  {t:"With someone",f:"{Person}と いきます。",m:"I go with (person).",ex:[["かぞく[と] いきます。","I go with my family."],["だれ[と] いきますか？","Who are you going with?"],["ひとりで いきます。","I go alone."]]},
  {t:"When?",f:"いつ いきますか？",m:"When are you going?",ex:[["4がつ とおか[に] いきます。","I'm going on April 10."],["たんじょうび[は] いつですか？","When is your birthday?"],["8がつ 17にちです。","It's August 17."]]},
  {t:"Months",f:"〜がつ",m:"",tb:{h:["","month"],r:[["January","いちがつ"],["February","にがつ"],["March","さんがつ"],["April","しがつ"],["May","ごがつ"],["June","ろくがつ"],["July","しちがつ"],["August","はちがつ"],["September","くがつ"],["October","じゅうがつ"],["November","じゅういちがつ"],["December","じゅうにがつ"],["?","なんがつ"]],quiz:["#"]},n:"Watch April, July and September: しがつ, しちがつ, くがつ."},
  {t:"Dates",f:"〜にち",m:"Days of the month. The first ten have their own words.",tb:{h:["","date"],r:[["1st","ついたち"],["2nd","ふつか"],["3rd","みっか"],["4th","よっか"],["5th","いつか"],["6th","むいか"],["7th","なのか"],["8th","ようか"],["9th","ここのか"],["10th","とおか"],["14th","じゅうよっか"],["20th","はつか"],["24th","にじゅうよっか"],["?","なんにち"]],quiz:["the #"]},n:"Other dates are the number + にち: 11th = じゅういちにち."},
  {t:"When to use に with time",f:"{Time}に",m:"Only some time words take に.",
   tb:{h:["","examples"],r:[["Always に","げつようびに · 10じに · 9がつに"],["Never に","きょう · あした · きのう · まいにち · いつ"],["Either way","あさ(に) · しゅうまつ(に)"]]}}
 ],
 v:"いきます=go;きます=come;かえります=return;らいしゅう=next week;せんしゅう=last week;せんげつ=last month;でんしゃ=train;バス=bus;くるま=car;あるいて=on foot;かぞく=family;ひとりで=alone;いつ=when;たんじょうび=birthday;〜がつ=month;コンビニ=convenience store;ショッピングモール=shopping mall;かいしゃ=company, office"},

{n:6,t:"Doing things (を)",g:"Say what you eat, drink, watch, and invite someone to join you.",
 p:[
  {t:"Object + verb",f:"{Noun}を{Verb}ます。",m:"I (verb) (noun).",ex:[["パン[を] たべます。","I eat bread."],["みず[を] のみます。","I drink water."],["テレビ[を] みます。","I watch TV."]],n:"を marks the thing the action is done to."},
  {t:"Noun + します",f:"{Noun}を します。",m:"Many activities use します.",ex:[["サッカー[を] します。","I play soccer."],["しゅくだい[を] します。","I do homework."],["でんわ[を] します。","I make a phone call."]]},
  {t:"Meet someone",f:"{Person}に あいます。",m:"I meet (person).",ex:[["ともだち[に] あいます。","I meet a friend."],["だれ[と] あいますか？","Who are you meeting?"]]},
  {t:"Did you …?",f:"…ましたか？",m:"Yes: ました · No: ませんでした",ex:[["きのう あさごはん[を] たべましたか？","Did you eat breakfast yesterday?"],["はい、たべました。","Yes, I did."],["いいえ、たべませんでした。","No, I didn't."]]},
  {t:"What do you …?",f:"なにを{Verb}ますか？",m:"What do you (verb)?",ex:[["なに[を] のみますか？","What will you drink?"],["なにも たべません。","I don't eat anything."],["だれとも あいません。","I don't meet anyone."]]},
  {t:"Where you do it",f:"{Place}で{Noun}を{Verb}ます。",m:"I (verb) (noun) at (place).",ex:[["いえ[で] べんきょう[を] します。","I study at home."],["どこ[で] ひるごはん[を] たべますか？","Where do you eat lunch?"]]},
  {t:"Always / sometimes",f:"いつも ・ ときどき",m:"always · sometimes",ex:[["いつも がっこう[で] べんきょうします。","I always study at school."]]},
  {t:"Invite someone",f:"いっしょに{Verb}ませんか？",m:"Would you like to (verb) together?",ex:[["いっしょに こうちゃ[を] のみませんか？","Shall we have some tea?"],["ええ、のみましょう。","Sure, let's."],["すみません、ちょっと…","Sorry, that's a bit… (a polite no)"]],n:"〜ましょう = let's. Japanese speakers rarely say a direct no."},
  {t:"And then",f:"それから",m:"after that, then",ex:[["にほんご[を] べんきょうします。それから デパート[へ] いきます。","I'll study Japanese, then go to the department store."]]},
  {t:"なん or なに?",f:"なん ・ なに",m:"Both mean what.",tb:{h:["use","when"],r:[["なん","before た・だ・な sounds: なんですか · なんの"],["なん","before counters: なんさい · なんじ"],["なに","everything else: なにを · なにで"]]},n:"なんで can mean how or why."}
 ],
 v:"たべます=eat;のみます=drink;みます=watch, see;ききます=listen;よみます=read;かきます=write;かいます=buy;すいます=smoke;とります=take (a photo);あいます=meet;します=do;ごはん=meal, rice;あさごはん=breakfast;ひるごはん=lunch;ばんごはん=dinner;パン=bread;たまご=egg;さかな=fish;にく=meat;やさい=vegetables;ぎゅうにく=beef;ぶたにく=pork;とりにく=chicken;くだもの=fruit;みず=water;おちゃ=green tea;こうちゃ=black tea;ぎゅうにゅう=milk;ビール=beer;おさけ=alcohol;ジュース=juice;えいが=movie;おんがく=music;てがみ=letter;しゅくだい=homework;しゃしん=photo;テニス=tennis;サッカー=soccer;みせ=shop;レストラン=restaurant;いえ=house, home;けさ=this morning;まいあさ=every morning;まいにち=every day;いつも=always;ときどき=sometimes;いっしょに=together;それから=after that"},

{n:7,t:"Tools, giving and receiving",g:"Say what you use, and who gives, lends or teaches what to whom.",
 p:[
  {t:"With a tool",f:"{Tool}で{Verb}ます。",m:"I (verb) with (tool).",ex:[["はし[で] さかな[を] たべます。","I eat fish with chopsticks."],["なに[で] たべますか？","What do you eat it with?"]],n:"で = the means or method."},
  {t:"In a language",f:"{Language}で{Verb}ます。",m:"I (verb) in (language).",ex:[["にほんご[で] レポート[を] かきます。","I write reports in Japanese."],["なにご[で] かきますか？","What language do you write in?"]]},
  {t:"What is it in …?",f:"{Word}は{Language}で なんですか？",m:"What is (word) in (language)?",ex:[["「ありがとう」[は] えいご[で] なんですか？","What is arigatou in English?"],["「Thank you」です。","It's Thank you."]]},
  {t:"Give and receive",f:"{Person}に あげます ・ もらいます",m:"give to (person) · receive from (person)",ex:[["かのじょ[は] かれ[に] プレゼント[を] あげます。","She gives him a present."],["かのじょ[は] かれ[に] プレゼント[を] もらいます。","She gets a present from him."]]},
  {t:"Pairs that work the same way",f:"に = to (giving) ・ に = from (receiving)",m:"",tb:{h:["giving (に = to)","receiving (に = from)"],r:[["あげます give","もらいます receive"],["かします lend","かります borrow"],["おしえます teach","ならいます learn"],["でんわを かけます call","でんわを もらいます get a call"]]},ex:[["ともだち[に] おかね[を] かします。","I lend money to a friend."],["ともだち[に] にほんご[を] ならいます。","I learn Japanese from a friend."]]},
  {t:"Already / not yet",f:"もう{Verb}ましたか？",m:"Have you (verb)ed yet?",ex:[["もう ばんごはん[を] たべましたか？","Have you eaten dinner yet?"],["はい、もう たべました。","Yes, I already ate."],["いいえ、まだです。","No, not yet."]]}
 ],
 v:"あげます=give;もらいます=receive;かします=lend;かります=borrow;おしえます=teach;ならいます=learn;おくります=send;きります=cut;かけます=make (a call);て=hand;はし=chopsticks;スプーン=spoon;フォーク=fork;ナイフ=knife;はさみ=scissors;パソコン=computer;かみ=paper;はな=flower;シャツ=shirt;プレゼント=present;にもつ=luggage;おかね=money;チケット=ticket;りょこう=trip;おみやげ=souvenir;おかあさん=(someone's) mother;おとうさん=(someone's) father;けしゴム=eraser;ホッチキス=stapler;セロテープ=sticky tape;いただきます=said before eating;もう=already;まだ=not yet;なにご=what language"},

{n:8,t:"Adjectives",g:"Describe things, and tell い-adjectives from な-adjectives.",
 p:[
  {t:"Two kinds",f:"い-adjective ・ な-adjective",m:"い-adjectives end in い: おいしい, たかい. The rest are な: しずか, ひま.",n:"Watch out: きれい and ゆうめい end in い but are な-adjectives."},
  {t:"Describe something",f:"{Noun}は{Adj}です。",m:"(noun) is (adj).",ex:[["この コーヒー[は] あついです。","This coffee is hot."],["この へや[は] きれいです。","This room is clean."]]},
  {t:"Negative",f:"い → くないです ・ な → じゃありません",m:"",tb:{h:["","is","isn't"],r:[["い","おおきいです","おおきくないです"],["い","いいです","よくないです (irregular)"],["な","しずかです","しずかじゃありません"],["な","きれいです","きれいじゃありません"]]}},
  {t:"Before a noun",f:"{Adj}＋{Noun}",m:"な-adjectives keep な before a noun.",ex:[["おいしい ごはん","delicious food"],["しずか[な] まち","a quiet town"],["きれい[な] やま","a beautiful mountain"]]},
  {t:"Very / not very",f:"とても ・ あまり〜ない",m:"とても = very · あまり + negative = not very",ex:[["とても ゆうめい[な] えいがです。","It's a very famous movie."],["あまり さむくないです。","It's not very cold."]]},
  {t:"How is it?",f:"{Noun}は どうですか？",m:"How is (noun)? / What do you think of it?",ex:[["にほん[の] コンビニ[は] どうですか？","How are Japanese convenience stores?"],["べんりです。","They're convenient."]],n:"そうですね… at the start of an answer means Hmm, let me think."},
  {t:"And / but",f:"そして ・ 〜が",m:"そして = and · が = but",ex:[["でんしゃ[は] きれいです。そして べんりです。","The trains are clean. And convenient."],["くるま[は] たかいです[が]、いいです。","The car is expensive, but good."]]},
  {t:"What kind of …?",f:"{A}は どんな{B}ですか？",m:"What kind of B is A?",ex:[["ふじさん[は] どんな やまですか？","What kind of mountain is Mt. Fuji?"],["たかい やまです。","It's a tall mountain."]]}
 ],
 v:"おおきい=big;ちいさい=small;あたらしい=new;ふるい=old (things);いい=good;わるい=bad;あつい=hot;さむい=cold (weather);つめたい=cold (to touch);むずかしい=difficult;やさしい=easy;たかい=expensive, tall;やすい=cheap;ひくい=low;おもしろい=interesting;おいしい=delicious;いそがしい=busy;たのしい=fun;しろい=white;くろい=black;あかい=red;あおい=blue;きいろい=yellow;ハンサム=handsome;きれい=beautiful, clean;しずか=quiet;にぎやか=lively;ゆうめい=famous;しんせつ=kind;げんき=healthy, cheerful;ひま=free (time);べんり=convenient;すてき=wonderful;あまい=sweet;からい=spicy;しおからい=salty;すっぱい=sour;にがい=bitter;こい=strong (taste);うすい=weak (taste);やま=mountain;さくら=cherry blossom;たべもの=food;まち=town;とても=very;あまり=not very;どんな=what kind of"},

{n:9,t:"Likes, skills, reasons",g:"Say what you like, what you're good at, what you understand, and why.",
 p:[
  {t:"Like / dislike",f:"{Noun}が すきです ・ きらいです",m:"I like / dislike (noun).",ex:[["すし[が] すきです。","I like sushi."],["さかな[が] きらいです。","I don't like fish."],["どんな たべもの[が] すきですか？","What kind of food do you like?"]]},
  {t:"How much you like it",f:"とても すき → とても きらい",m:"",tb:{h:["","meaning"],r:[["とても すきです","I really like it"],["すきです","I like it"],["きらいじゃありません","I don't dislike it"],["まあまあです","It's so-so"],["あまり すきじゃありません","I don't really like it"],["きらいです","I dislike it"],["とても きらいです","I really dislike it"]]}},
  {t:"Good / bad at",f:"{Noun}が じょうずです ・ へたです",m:"(person) is good / bad at (noun).",ex:[["マリアさん[は] りょうり[が] じょうずです。","Maria is good at cooking."],["わたし[は] カラオケ[が] へたです。","I'm bad at karaoke."]]},
  {t:"How well you understand",f:"{Noun}が わかります",m:"",tb:{h:["","meaning"],r:[["よく わかります","I understand well"],["だいたい わかります","I mostly understand"],["すこし わかります","I understand a little"],["あまり わかりません","I don't understand much"],["ぜんぜん わかりません","I don't understand at all"]]},ex:[["ひらがな[が] よく わかります。","I understand hiragana well."]]},
  {t:"Have",f:"{Noun}が あります",m:"I have (noun).",ex:[["じかん[が] あります。","I have time."],["ようじ[が] あります。","I have something to do."],["おかね[が] ぜんぜん ありません。","I have no money at all."]],n:"たくさん = a lot · すこし = a little"},
  {t:"Because …",f:"{Reason}から、{Result}。",m:"Because (reason), (result).",ex:[["コーヒー[が] すきです[から]、まいにち のみます。","I like coffee, so I drink it every day."]]},
  {t:"Why?",f:"どうしてですか？",m:"Why? Answer with 〜から.",ex:[["どうして にほんご[を] べんきょうしますか？","Why do you study Japanese?"],["たのしいです[から]。","Because it's fun."]],n:"どうして = neutral · なぜ = formal · なんで = casual"}
 ],
 v:"すき=like;きらい=dislike;じょうず=good at;へた=bad at;わかります=understand;あります=have;りょうり=cooking;のみもの=drinks;スポーツ=sports;やきゅう=baseball;ダンス=dance;カラオケ=karaoke;うた=song;え=picture;こまかい おかね=small change;じかん=time;ようじ=errand, plans;やくそく=appointment;ひらがな=hiragana;かんじ=kanji;しゅじん=my husband;ごしゅじん=(someone's) husband;つま=my wife;おくさん=(someone's) wife;よく=well;だいたい=mostly;すこし=a little;ぜんぜん=not at all;たくさん=a lot;どうして=why"},

{n:10,t:"Where things are",g:"Say what or who is somewhere, and describe positions.",
 p:[
  {t:"There is …",f:"{Place}に{Noun}が います ・ あります",m:"います for people and animals · あります for things",ex:[["いえ[に] おかあさん[が] います。","My mother is at home."],["いえ[に] テレビ[が] あります。","There's a TV at home."]]},
  {t:"Who / what is there?",f:"だれが いますか？ ・ なにが ありますか？",m:"After a question word, always use が.",ex:[["こうえん[に] だれ[が] いますか？","Who is in the park?"],["こうえん[に] いぬ[が] います。","There's a dog in the park."],["だれも いません。","Nobody is here."],["なにも ありません。","There's nothing."]]},
  {t:"Positions",f:"{Noun}の{Position}",m:"on / under / next to … (noun)",ex:[["つくえ[の] うえ[に] ねこ[が] います。","There's a cat on the desk."],["ゆうびんきょく[は] ぎんこう[の] となり[に] あります。","The post office is next to the bank."],["ほんや[は] はなやと スーパー[の] あいだ[に] あります。","The bookstore is between the florist and the supermarket."]]},
  {t:"Where is it?",f:"{Noun}は どこに ありますか ・ いますか？",m:"Where is (noun)?",ex:[["ねこ[は] どこ[に] いますか？","Where is the cat?"]]},
  {t:"に or で?",f:"に = where it is ・ で = where you do something",m:"",ex:[["えき[の] ちかく[に] ぎんこう[が] あります。","There's a bank near the station."],["えき[の] ちかく[で] ともだち[に] あいました。","I met a friend near the station."]]}
 ],
 v:"います=exist (people, animals);あります=exist (things);うえ=on, above;した=under;まえ=in front;うしろ=behind;みぎ=right;ひだり=left;なか=inside;そと=outside;となり=next to;ちかく=near;あいだ=between;おとこのひと=man;おんなのひと=woman;おとこのこ=boy;おんなのこ=girl;こども=child;いぬ=dog;ねこ=cat;き=tree;はこ=box;でんち=battery;ドア=door;まど=window;ポスト=mailbox;たな=shelf;つくえ=desk;テーブル=table;ベッド=bed;れいぞうこ=fridge;スイッチ=switch;ビル=building;こうえん=park;きっさてん=café;ほんや=bookstore;のりば=taxi/bus stand;えき=station;いろいろな=various"},

{n:11,t:"Counting",g:"Count things and people, say how long and how often.",
 p:[
  {t:"How many?",f:"{Noun}が いくつ ありますか？",m:"How many (noun) are there?",ex:[["つくえ[の] うえ[に] みかん[が] いくつ ありますか？","How many oranges are on the desk?"],["よっつ あります。","There are four."]],n:"The number goes after the particle: りんご[を] みっつ かいました."},
  {t:"Counters",f:"つ ・ にん ・ まい ・ だい",m:"things · people · flat things · machines and vehicles",
   tb:{h:["#","things","people","flat ～まい","machines ～だい"],r:[["1","ひとつ","ひとり","いちまい","いちだい"],["2","ふたつ","ふたり","にまい","にだい"],["3","みっつ","さんにん","さんまい","さんだい"],["4","よっつ","よにん","よんまい","よんだい"],["5","いつつ","ごにん","ごまい","ごだい"],["6","むっつ","ろくにん","ろくまい","ろくだい"],["7","ななつ","ななにん","ななまい","ななだい"],["8","やっつ","はちにん","はちまい","はちだい"],["9","ここのつ","きゅうにん","きゅうまい","きゅうだい"],["10","とお","じゅうにん","じゅうまい","じゅうだい"],["?","いくつ","なんにん","なんまい","なんだい"]],quiz:["# thing|# things","# person|# people","# flat thing|# flat things","# machine|# machines"]},
   ex:[["かぞく[は] なんにん いますか？","How many people are in your family?"],["くるま[が] にだい あります。","There are two cars."]],n:"Also: 〜ほん for long things (pens, bottles), 〜こ for small objects."},
  {t:"How long",f:"ふん ・ じかん ・ にち ・ しゅうかん ・ かげつ ・ ねん",m:"minutes · hours · days · weeks · months · years",
   tb:{h:["#","minutes","hours","days","weeks","months","years"],r:[["1","いっぷん","いちじかん","いちにち","いっしゅうかん","いっかげつ","いちねん"],["2","にふん","にじかん","ふつか","にしゅうかん","にかげつ","にねん"],["3","さんぷん","さんじかん","みっか","さんしゅうかん","さんかげつ","さんねん"],["4","よんぷん","よじかん","よっか","よんしゅうかん","よんかげつ","よねん"],["5","ごふん","ごじかん","いつか","ごしゅうかん","ごかげつ","ごねん"],["6","ろっぷん","ろくじかん","むいか","ろくしゅうかん","ろっかげつ","ろくねん"],["7","ななふん","ななじかん","なのか","ななしゅうかん","ななかげつ","ななねん"],["8","はっぷん","はちじかん","ようか","はっしゅうかん","はちかげつ","はちねん"],["9","きゅうふん","くじかん","ここのか","きゅうしゅうかん","きゅうかげつ","きゅうねん"],["10","じゅっぷん","じゅうじかん","とおか","じゅっしゅうかん","じゅっかげつ","じゅうねん"]],quiz:["# minute|# minutes","# hour|# hours","# day|# days","# week|# weeks","# month|# months","# year|# years"]},
   ex:[["2じかん べんきょうしました。","I studied for two hours."]]},
  {t:"How long does it take?",f:"どのくらい かかりますか？",m:"How long / how much does it take?",ex:[["にほん[から] イギリス[まで] どのくらい かかりますか？","How long from Japan to the UK?"],["14じかん ぐらい かかります。","About 14 hours."],["60,000えん ぐらい かかります。","It costs about 60,000 yen."]],n:"ぐらい (or くらい) = about"},
  {t:"How often",f:"{Period}に{Number}かい",m:"(number) times per (period)",ex:[["いっしゅうかん[に] さんかい べんきょうします。","I study three times a week."],["いちにち[に] いっかい","once a day"]],tb:{h:["#","times"],r:[["1","いっかい"],["2","にかい"],["3","さんかい"],["4","よんかい"],["5","ごかい"],["6","ろっかい"],["7","ななかい"],["8","はっかい"],["9","きゅうかい"],["10","じゅっかい"],["?","なんかい"]],quiz:["once|# times"]}}
 ],
 v:"いくつ=how many;どのくらい=how long, how much;ぐらい=about;かかります=take (time), cost;やすみます=take a day off;りんご=apple;みかん=mandarin orange;カレーライス=curry rice;きって=stamp;はがき=postcard;ふうとう=envelope;こうくうびん=airmail;ふなびん=sea mail;りょうしん=parents;きょうだい=siblings;ちち=my father;はは=my mother;あに=my older brother;おにいさん=(someone's) older brother;あね=my older sister;おねえさん=(someone's) older sister;おとうと=my younger brother;おとうとさん=(someone's) younger brother;いもうと=my younger sister;いもうとさん=(someone's) younger sister;〜かい=times"},

{n:12,t:"Past and comparing",g:"Talk about the past with adjectives and nouns, and compare things.",
 p:[
  {t:"Past of nouns and adjectives",f:"でした ・ かったです",m:"",tb:{h:["","was","wasn't"],r:[["noun","あめでした","あめじゃありませんでした"],["な","ひまでした","ひまじゃありませんでした"],["い","あつかったです","あつくなかったです"],["い","よかったです","よくなかったです (いい is irregular)"]]},ex:[["きのう[は] あめでした。","It rained yesterday."],["きのう[は] あつかったです。","It was hot yesterday."]]},
  {t:"How was it?",f:"{Noun}は どうでしたか？",m:"How was (noun)?",ex:[["きのう[の] えいが[は] どうでしたか？","How was yesterday's movie?"],["おもしろかったです。","It was interesting."]]},
  {t:"A is more … than B",f:"{A}は{B}より{Adj}です。",m:"A is more (adj) than B.",ex:[["にほん[は] ちゅうごく[より] ちいさいです。","Japan is smaller than China."]]},
  {t:"Which one is more …?",f:"{A}と{B}と どちらが{Adj}ですか？",m:"Which is more (adj), A or B?",ex:[["いぬ[と] ねこ[と] どちら[が] すきですか？","Which do you like more, dogs or cats?"],["いぬ[の] ほう[が] すきです。","I prefer dogs."],["どちらも すきです。","I like both."]]},
  {t:"The most …",f:"{Group}で{X}が いちばん{Adj}です。",m:"Among (group), X is the most (adj).",ex:[["にほんりょうり[で] なに[が] いちばん おいしいですか？","What's the most delicious Japanese food?"],["てんぷら[が] いちばん おいしいです。","Tempura is the most delicious."]],n:"Question words: なに what · どこ where · だれ who · いつ when. The group can also be 〜の なかで."}
 ],
 v:"かんたん=easy, simple;ちかい=near;とおい=far;はやい=fast, early;おそい=slow, late;おおい=many;すくない=few;あたたかい=warm;すずしい=cool;おもい=heavy;かるい=light;きせつ=season;はる=spring;なつ=summer;あき=autumn;ふゆ=winter;てんき=weather;あめ=rain;ゆき=snow;くもり=cloudy;はれ=sunny;ホテル=hotel;くうこう=airport;うみ=sea;パーティー=party;おまつり=festival;しけん=exam;すし=sushi;てんぷら=tempura;すきやき=sukiyaki;さしみ=sashimi;もみじ=autumn leaves;より=than;どちら=which (of two);いちばん=the most"}
];
L.forEach(l=>{l.vocab=l.v.split(";").map(s=>{const i=s.indexOf("=");return {jp:s.slice(0,i),en:s.slice(i+1),n:l.n}})});
const ALLV=L.flatMap(l=>l.vocab);

const PART=[
 ["わたし＿ がくせいです。","は",["は","を","に","で"],"I am a student."],
 ["パン＿ たべます。","を",["を","に","が","へ"],"I eat bread."],
 ["6じ＿ おきます。","に",["に","を","で","の"],"I wake up at 6."],
 ["どこ＿ いきますか？","へ",["へ","を","が","の"],"Where are you going?"],
 ["でんしゃ＿ かいしゃへ いきます。","で",["で","を","に","が"],"I go to work by train."],
 ["かぞく＿ りょこうします。","と",["と","を","が","の"],"I travel with my family."],
 ["これは えいご＿ ほんです。","の",["の","を","に","で"],"This is an English book."],
 ["9じ＿ 5じまで はたらきます。","から",["から","まで","に","で"],"I work from 9 to 5."],
 ["いえ＿ べんきょうします。","で",["で","を","が","の"],"I study at home."],
 ["つくえの うえ＿ ねこが います。","に",["に","を","で","から"],"There's a cat on the desk."],
 ["すし＿ すきです。","が",["が","を","に","で"],"I like sushi."],
 ["はし＿ たべます。","で",["で","を","に","の"],"I eat with chopsticks."],
 ["ともだち＿ おかねを かします。","に",["に","を","で","から"],"I lend money to a friend."],
 ["にほんは ちゅうごく＿ ちいさいです。","より",["より","から","まで","の"],"Japan is smaller than China."],
 ["ひらがな＿ わかります。","が",["が","を","に","で"],"I understand hiragana."],
 ["こうえんに だれ＿ いますか？","が",["が","は","を","に"],"Who is in the park?"],
 ["せんせい＿ にほんごを ならいます。","に",["に","を","が","の"],"I learn Japanese from the teacher."],
 ["さむいです＿、コートを きます。","から",["から","まで","より","が"],"It's cold, so I'll wear a coat."],
 ["げつようび＿ いきます。","に",["に","を","が","で"],"I'll go on Monday."],
 ["この くつは ジョンさん＿です。","の",["の","が","に","を"],"These shoes are John's."]
];

/* ---------- answer-the-question quiz: [lesson, question, answer, English of the answer], taken from the lesson examples ---------- */
const QA=[
 [1,"あのかた[は] どなたですか？","トムさんです。","That's Tom."],
 [1,"おいくつですか？","25さいです。","I'm 25."],
 [2,"これ[は] なん[の] ほんですか？","えいご[の] ほんです。","It's an English book."],
 [2,"これ[は] だれ[の] くつですか？","ジョンさん[の] くつです。","They're John's shoes."],
 [3,"トイレ[は] どこですか？","あそこです。","It's over there."],
 [3,"レストラン[は] なんがいですか？","3がいです。","The 3rd floor."],
 [4,"なんじ[に] おきますか？","6じ[に] おきます。","I wake up at 6."],
 [5,"なに[で] いきますか？","あるいて いきます。","I walk there."],
 [5,"だれ[と] いきますか？","ひとりで いきます。","I go alone."],
 [5,"たんじょうび[は] いつですか？","8がつ 17にちです。","It's August 17."],
 [6,"きのう あさごはん[を] たべましたか？","はい、たべました。","Yes, I did."],
 [6,"いっしょに こうちゃ[を] のみませんか？","ええ、のみましょう。","Sure, let's."],
 [7,"「ありがとう」[は] えいご[で] なんですか？","「Thank you」です。","It's Thank you."],
 [7,"もう ばんごはん[を] たべましたか？","はい、もう たべました。","Yes, I already ate."],
 [8,"にほん[の] コンビニ[は] どうですか？","べんりです。","They're convenient."],
 [8,"ふじさん[は] どんな やまですか？","たかい やまです。","It's a tall mountain."],
 [9,"どうして にほんご[を] べんきょうしますか？","たのしいです[から]。","Because it's fun."],
 [10,"こうえん[に] だれ[が] いますか？","こうえん[に] いぬ[が] います。","There's a dog in the park."],
 [11,"つくえ[の] うえ[に] みかん[が] いくつ ありますか？","よっつ あります。","There are four."],
 [11,"にほん[から] イギリス[まで] どのくらい かかりますか？","14じかん ぐらい かかります。","About 14 hours."],
 [12,"きのう[の] えいが[は] どうでしたか？","おもしろかったです。","It was interesting."],
 [12,"いぬ[と] ねこ[と] どちら[が] すきですか？","いぬ[の] ほう[が] すきです。","I prefer dogs."],
 [12,"にほんりょうり[で] なに[が] いちばん おいしいですか？","てんぷら[が] いちばん おいしいです。","Tempura is the most delicious."]
];

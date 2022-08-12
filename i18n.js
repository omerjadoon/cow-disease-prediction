import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';


i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    compatibilityJSON: 'v3',
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
        en: {
            translation: {
              home: {
                detectfromsymptoms: 'Detect from Symptoms',
                detectusingcamera:'Detect using Camera',
                detectusingimage:'Detect using Image',
                pastdetections:'Past Detections',
                settings:'Settings',
                logout:'Logout'
              },
              auth:{
                login: 'Login',
                register: 'Register',
                donthaveaccount: 'Don\'t have account? ',
                email:'Email',
                password:'Password',
                fullname:'Full Name',
                alreadygotanaccount:'Already got an account? ',
                confirmpassword:'Confirm Password',
               

              },
              image:{
                title:'Cow Disease Prediction',
                chooseimage:'Tap to choose image',
                chances0:'Your cow has  ',
                chances1:'chances to have ',
                description:'Description',
                symptoms:'Symptoms',
                treatment:'Treatment'

              },
              disease0:{
                name: 'Foot and mouth disease',
                symptoms: 'slobbering and smacking lips ,shivering ,tender and sore feet , reduced milk yield , sores and blisters on feet , raised temperature', 
                treatment: 'There is no specific treatment for FMD. The conventional method of treating infected animals mainly involves the use of antibiotics, flunixin meglumine and mild disinfectants',
                description:'Foot and mouth disease (FMD) is a severe, highly contagious viral disease of livestock that has a significant economic impact. The disease affects cattle, swine, sheep, goats and other cloven-hoofed ruminants. It is a transboundary animal disease (TAD) that deeply affect the production of livestock and disrupting regional and international trade in animals and animal products. The disease is estimated to circulate in 77% of the global livestock population, in Africa, the Middle East and Asia, as well as in a limited area of South America. Countries that are currently free of FMD without vaccination remain under constant threat of an incursion. Seventy-five percent of the costs attributed to FMD prevention and control are incurred by low income and lower-middle income countries. Africa and Eurasia are the regions which incur the largest costs, accounting for 50% and 33% of the total costs respectively. FMD is caused by an Aphthovirus of the family Picornaviridae, seven strains (A, O, C, SAT1, SAT2, SAT3, and Asia1) are endemic in different countries worldwide. Each strain requires a specific vaccine to provide immunity to a vaccinated animal. Its prevention is based on the presence of early detection and warning systems and the implementation of effective surveillance among other measures. FMD is the first disease for which the OIE established an official list of disease-free countries which can be officially recognised as free of the disease either in their entirety or in defined zones and compartments.',
               

              },
              disease1:{
                name: 'Infectious Bovine Keratoconjunctivitis',
                symptoms: 'The bacteria invade the lacrimal glands of the eye, causing keratitis, uveitis, and corneal ulceration. Cattle show signs of pain, increased lacrimation, excessive blinking, and conjunctivitis. More severe cases may show systemic signs such as anorexia and weight loss.',
                treatment: 'Stabling affected cattle, applying eye patches or suturing the eyelids are all beneficial. Two antibiotics, Tetracycline and Tulathromycin (Draxxin) are labeled to treat pinkeye.',
                description:'IBK, commonly known as pinkeye, is a highly contagious ocular disease. Infectious Bovine Keratoconjunctivitis (IBK) or pinkeye, is a common, highly contagious ocular disease affecting primarily calves. Primarily caused by Moraxella bovis, infection may lead to vision loss in acute cases.',
               

              },
              disease2:{
                name: 'lysergic acid diethylamide',
                symptoms: 'Scabs develop in the centre of the nodules after which the scabs fall off, leaving large holes that may become infected. Swelling of the limbs, brisket and genitals may occur. Watering eyes. Increased nasal and salivary secretions.',
                treatment: 'LSD is caused by a virus which means that there is no specific treatment. Control of LSD must focus on prevention, including vaccination. In the event of outbreaks in disease-free countries then slaughter of infected and in-contact animals plus movement restrictions may be considered.',
                description:'Lysergic Acid Diethylamide also called as Lumpy skin disease (LSD) is a viral disease of cattle and water buffalo that causes relatively low mortality; however, the disease can result in animal welfare issues and significant production losses. The disease is spread primarily by biting insects such as certain species of flies, mosquitoes and possibly ticks.',
               

              }
            }
          },
          ur: {
            translation: {
                home: {
                    detectfromsymptoms: 'علامات سے پتہ لگائیں۔',
                    detectusingcamera:'کیمرہ استعمال کرکے پتہ لگائیں۔',
                    detectusingimage:'تصویر سے پتہ لگائیں۔',
                    pastdetections:'پیشن گوئیاں',
                    settings:'سیٹنگ',
                    logout:'لاگ آوٹ'
                  },
              auth:{
                login: 'لاگ ان کریں',
                register: 'رجسٹر کریں۔',
                donthaveaccount: 'اکاؤنٹ نہیں ہے؟ ',
                email:'ای میل',
                password:'پاس ورڈ',
                fullname:'پورا نام',
                alreadygotanaccount:'پہلے ہی اکاؤنٹ ہے؟ ',
                confirmpassword:'پاس ورڈ دوبارہ لکھیں'

              },
              image:{
                title:'گائے کی بیماری کی تشخیص',
                chooseimage:'تصویر منتخب کرنے کے لیے دبائیں۔',
                chances0:'آپ کی گائے میں مندرجہ ذیل بیماری کے',
                chances1:' امکانات ہیں۔',
                description:'تفصیل',
                symptoms:'علامات',
                treatment:'علاج'

              },
              disease0:{
                name: 'پاؤں اور منہ کی بیماری',
                symptoms: 'پھڑپھڑاتے ہونٹ، کپکپاہٹ، نرم اور زخم پاؤں، دودھ کی پیداوار میں کمی، پاؤں پر زخم اور چھالے، درجہ حرارت میں اضافہ', 
                treatment: 'FMD کا کوئی خاص علاج نہیں ہے۔ متاثرہ جانوروں کے علاج کے روایتی طریقے میں بنیادی طور پر اینٹی بائیوٹکس، فلونیکسن میگلومین اور ہلکے جراثیم کش ادویات کا استعمال شامل ہے۔',
                description:'پاؤں اور منہ کی بیماری (FMD) مویشیوں کی ایک شدید، انتہائی متعدی وائرل بیماری ہے جس کا معاشی اثر بہت زیادہ ہے۔ یہ بیماری مویشیوں، خنزیروں، بھیڑوں، بکریوں اور دیگر لونگوں والے کھروں کو متاثر کرتی ہے۔ یہ ایک عبوری جانوروں کی بیماری (TAD) ہے جو مویشیوں کی پیداوار پر گہرا اثر ڈالتی ہے اور جانوروں اور جانوروں کی مصنوعات کی علاقائی اور بین الاقوامی تجارت میں خلل ڈالتی ہے۔ ایک اندازے کے مطابق یہ بیماری عالمی مویشیوں کی 77% آبادی میں پھیلتی ہے، افریقہ، مشرق وسطیٰ اور ایشیا کے ساتھ ساتھ جنوبی امریکہ کے ایک محدود علاقے میں۔ وہ ممالک جو فی الحال ویکسینیشن کے بغیر ایف ایم ڈی سے پاک ہیں ان پر حملے کے مستقل خطرہ ہیں۔ ایف ایم ڈی کی روک تھام اور کنٹرول سے منسوب اخراجات کا 75 فیصد کم آمدنی والے اور کم درمیانی آمدنی والے ممالک میں خرچ ہوتے ہیں۔ افریقہ اور یوریشیا وہ علاقے ہیں جو سب سے زیادہ اخراجات اٹھاتے ہیں، جو بالترتیب کل اخراجات کا 50% اور 33% ہیں۔ FMD Picornaviridae خاندان کے Aphthovirus کی وجہ سے ہوتا ہے، سات قسمیں (A, O, C, SAT1, SAT2, SAT3 اور Asia1) دنیا بھر کے مختلف ممالک میں مقامی ہیں۔ ہر تناؤ کو ایک مخصوص ویکسین کی ضرورت ہوتی ہے تاکہ ویکسین لگائے گئے جانور کو قوت مدافعت فراہم کی جا سکے۔ اس کی روک تھام جلد پتہ لگانے اور انتباہی نظام کی موجودگی اور دیگر اقدامات کے ساتھ موثر نگرانی کے نفاذ پر مبنی ہے۔ FMD وہ پہلی بیماری ہے جس کے لیے OIE نے بیماری سے پاک ممالک کی ایک سرکاری فہرست قائم کی ہے جسے سرکاری طور پر یا تو مکمل طور پر یا متعین زونز اور حصوں میں بیماری سے پاک تسلیم کیا جا سکتا ہے۔',
               

              },
              disease1:{
                name: 'متعدی بوائین کیراٹوکونجیکٹیوائٹس',
                symptoms: 'بیکٹیریا آنکھ کے آنسو کے غدود پر حملہ کرتے ہیں، جس سے کیراٹائٹس، یوویائٹس، اور قرنیہ کے السریشن ہوتے ہیں۔ مویشی درد کی علامات ظاہر کرتے ہیں، لکریمیشن میں اضافہ، بہت زیادہ جھپکنا، اور آشوب چشم۔ زیادہ سنگین معاملات میں نظامی علامات جیسے کشودا اور وزن میں کمی ظاہر ہو سکتی ہے۔',
                treatment: 'متاثرہ مویشیوں کو ٹھونسنا، آنکھوں پر پٹیاں لگانا یا پلکوں کو سیون کرنا سب فائدہ مند ہیں۔ پنکی کے علاج کے لیے دو اینٹی بایوٹک، ٹیٹراسائکلائن اور ٹولاتھرومائسن (ڈریکسن) کا لیبل لگایا گیا ہے۔',
                description:'IBK، جسے عام طور پر گلابی آنکھ کے نام سے جانا جاتا ہے، ایک انتہائی متعدی آنکھ کی بیماری ہے۔ متعدی بوائین کیراٹوکونجیکٹیوائٹس (IBK) یا پنکی، ایک عام، انتہائی متعدی آنکھ کی بیماری ہے جو بنیادی طور پر بچھڑوں کو متاثر کرتی ہے۔ بنیادی طور پر موراکسیلا بووس کی وجہ سے، انفیکشن شدید صورتوں میں بینائی کی کمی کا باعث بن سکتا ہے۔',
               

              },
              disease2:{
                name: 'lysergic ایسڈ diethylamide',
                symptoms: 'نوڈولس کے بیچ میں خارش بنتی ہے جس کے بعد خارش گر جاتی ہے جس سے بڑے سوراخ ہو جاتے ہیں جو انفیکشن کا شکار ہو سکتے ہیں۔ اعضاء، بریسکیٹ اور جنسی اعضاء میں سوجن ہو سکتی ہے۔ پانی بھرتی آنکھیں۔ ناک اور تھوک کی رطوبتوں میں اضافہ۔',
                treatment: 'LSD ایک وائرس کی وجہ سے ہوتا ہے جس کا مطلب ہے کہ اس کا کوئی خاص علاج نہیں ہے۔ ایل ایس ڈی کے کنٹرول کو روک تھام پر توجہ مرکوز کرنی چاہیے، بشمول ویکسینیشن۔ بیماری سے پاک ممالک میں پھیلنے کی صورت میں متاثرہ اور رابطے میں رہنے والے جانوروں کے ذبح کے علاوہ نقل و حرکت پر پابندیوں پر غور کیا جا سکتا ہے۔',
                description:'Lysergic Acid Diethylamide جسے Lumpy skin disease (LSD) بھی کہا جاتا ہے مویشیوں اور بھینسوں کی ایک وائرل بیماری ہے جو نسبتاً کم اموات کا سبب بنتی ہے۔ تاہم، بیماری کے نتیجے میں جانوروں کی فلاح و بہبود کے مسائل اور پیداوار میں نمایاں نقصان ہو سکتا ہے۔ یہ بیماری بنیادی طور پر کیڑوں کے کاٹنے سے پھیلتی ہے جیسے کہ مکھیوں، مچھروں اور ممکنہ طور پر ٹکڑوں کی مخصوص اقسام۔',
               

              }
            
            },
            
            
          }
          
        }

  });

export default i18n;
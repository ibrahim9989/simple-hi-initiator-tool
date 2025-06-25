
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'te' | 'hi' | 'ur';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Common
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    loading: 'Loading...',
    submit: 'Submit',
    cancel: 'Cancel',
    save: 'Save',
    
    // Auth
    signIn: 'Sign In',
    signUp: 'Sign Up',
    signOut: 'Sign Out',
    email: 'Email',
    password: 'Password',
    continueWithGoogle: 'Continue with Google',
    enterYourEmail: 'Enter your email',
    enterYourPassword: 'Enter your password',
    alreadyHaveAccount: 'Already have an account? Sign in',
    dontHaveAccount: "Don't have an account? Sign up",
    checkYourEmail: 'Check your email',
    confirmationLinkSent: "We've sent you a confirmation link.",
    authenticationError: 'Authentication Error',
    googleSignInError: 'Google Sign-in Error',
    
    // Profile
    completeProfile: 'Complete Your Profile',
    name: 'Name',
    phone: 'Phone Number',
    district: 'District',
    state: 'State',
    age: 'Age',
    enterYourName: 'Enter your name',
    enterYourPhone: 'Enter your phone number',
    enterYourDistrict: 'Enter your district',
    enterYourState: 'Enter your state',
    enterYourAge: 'Enter your age',
    profileUpdated: 'Profile updated successfully!',
    
    // Assessment
    cyrexAssessment: 'Cyrex Assessment',
    cybersecurityAssessmentPlatform: 'Cybersecurity Assessment Platform',
    chooseYourAgeGroup: 'Choose Your Age Group',
    selectAgeGroupToStart: 'Select your age group to begin the cybersecurity awareness assessment',
    years: 'Years',
    teenagers: 'Teenagers',
    youngAdults: 'Young Adults',
    adults: 'Adults',
    seniors: 'Seniors',
    startAssessment: 'Start Assessment',
    loadingAssessment: 'Loading assessment...',
    noQuestionsAvailable: 'No questions available for this age group.',
    scenario: 'Scenario',
    whatWouldYouDo: 'What would you do?',
    submitting: 'Submitting...',
    
    // Results
    assessmentComplete: 'Assessment Complete',
    completedOn: 'Completed on',
    lowRiskExcellent: 'Low Risk - Excellent Security Awareness!',
    mediumRiskGood: 'Medium Risk - Good Foundation',
    highRiskImprovement: 'High Risk - Improvement Needed',
    criticalRiskImmediate: 'Critical Risk - Immediate Action Required',
    lowRiskDescription: 'You demonstrate strong cybersecurity awareness and are well-equipped to identify and avoid common scams.',
    mediumRiskDescription: 'You have a solid understanding of cybersecurity but could benefit from additional awareness in certain areas.',
    highRiskDescription: 'You may be vulnerable to certain types of cyber attacks. Consider additional cybersecurity training.',
    criticalRiskDescription: 'You are at high risk of falling victim to cyber crimes. Immediate cybersecurity education is strongly recommended.',
    correctAnswers: 'Correct Answers',
    totalQuestions: 'Total Questions',
    riskLevel: 'Risk Level',
    recommendations: 'Recommendations',
    takeAnotherAssessment: 'Take Another Assessment',
    
    // History
    assessmentHistory: 'Assessment History',
    viewHistory: 'View History',
    noAssessmentsYet: 'No assessments completed yet',
    score: 'Score',
    
    // Themes (example translations)
    fakeinfluencergiveawaytrap: 'Fake Influencer Giveaway Trap',
    romancescam: 'Romance Scam',
    scamjoboffers: 'Scam Job Offers',
    cheapfashionaccessoryscam: 'Cheap Fashion & Accessory Scam',
    fakejobinternshipoffer: 'Fake Job/Internship Offer',
    courierscam: 'Courier Scam',
    marketplacescam: 'Marketplace Scam',
    fakeelectricitybill: 'Fake Electricity Bill',
    bankingmissedcall: 'Banking Missed Call',
    fakemedicinehealthscheme: 'Fake Medicine/Health Scheme',
    aadhaarscam: 'Aadhaar Scam'
  },
  
  te: {
    // Common
    back: 'వెనుకకు',
    next: 'తరువాత',
    previous: 'మునుపటి',
    loading: 'లోడ్ అవుతోంది...',
    submit: 'సమర్పించు',
    cancel: 'రద్దు చేయి',
    save: 'భద్రపరచు',
    
    // Auth
    signIn: 'సైన్ ఇన్',
    signUp: 'సైన్ అప్',
    signOut: 'సైన్ అవుట్',
    email: 'ఇమెయిల్',
    password: 'పాస్‌వర్డ్',
    continueWithGoogle: 'Google తో కొనసాగించండి',
    enterYourEmail: 'మీ ఇమెయిల్ నమోదు చేయండి',
    enterYourPassword: 'మీ పాస్‌వర్డ్ నమోదు చేయండి',
    alreadyHaveAccount: 'ఇప్పటికే ఖాతా ఉందా? సైన్ ఇన్ చేయండి',
    dontHaveAccount: "ఖాతా లేదా? సైన్ అప్ చేయండి",
    checkYourEmail: 'మీ ఇమెయిల్ చూడండి',
    confirmationLinkSent: "మేము మీకు నిర్ధారణ లింక్ పంపాము.",
    authenticationError: 'ప్రమాణీకరణ లోపం',
    googleSignInError: 'Google సైన్-ఇన్ లోపం',
    
    // Profile
    completeProfile: 'మీ ప్రొఫైల్ పూర్తి చేయండి',
    name: 'పేరు',
    phone: 'ఫోన్ నంబర్',
    district: 'జిల్లా',
    state: 'రాష్ట్రం',
    age: 'వయస్సు',
    enterYourName: 'మీ పేరు నమోదు చేయండి',
    enterYourPhone: 'మీ ఫోన్ నంబర్ నమోదు చేయండి',
    enterYourDistrict: 'మీ జిల్లా నమోదు చేయండి',
    enterYourState: 'మీ రాష్ట్రం నమోదు చేయండి',
    enterYourAge: 'మీ వయస్సు నమోదు చేయండి',
    profileUpdated: 'ప్రొఫైల్ విజయవంతంగా నవీకరించబడింది!',
    
    // Assessment
    cyrexAssessment: 'సైరెక్స్ అంచనా',
    cybersecurityAssessmentPlatform: 'సైబర్ సెక్యూరిటీ అంచనా వేదిక',
    chooseYourAgeGroup: 'మీ వయో వర్గాన్ని ఎంచుకోండి',
    selectAgeGroupToStart: 'సైబర్ సెక్యూరిటీ అవగాహన అంచనా ప్రారంభించడానికి మీ వయో వర్గాన్ని ఎంచుకోండి',
    years: 'సంవత్సరాలు',
    teenagers: 'యువకులు',
    youngAdults: 'యువ వయస్కులు',
    adults: 'వయస్కులు',
    seniors: 'పెద్దలు',
    startAssessment: 'అంచనా ప్రారంభించండి',
    loadingAssessment: 'అంచనా లోడ్ అవుతోంది...',
    noQuestionsAvailable: 'ఈ వయో వర్గానికి ప్రశ్నలు అందుబాటులో లేవు.',
    scenario: 'దృశ్యం',
    whatWouldYouDo: 'మీరు ఏమి చేస్తారు?',
    submitting: 'సమర్పిస్తోంది...',
    
    // Results
    assessmentComplete: 'అంచనా పూర్తయింది',
    completedOn: 'పూర్తయిన తేదీ',
    lowRiskExcellent: 'తక్కువ ప్రమాదం - అద్భుతమైన భద్రతా అవగాహన!',
    mediumRiskGood: 'మధ్యస్థ ప్రమాదం - మంచి పునాది',
    highRiskImprovement: 'అధిక ప్రమాదం - మెరుగుదల అవసరం',
    criticalRiskImmediate: 'క్లిష్ట ప్రమాదం - తక్షణ చర్య అవసరం',
    lowRiskDescription: 'మీరు బలమైన సైబర్ సెక్యూరిటీ అవగాహనను ప్రదర్శిస్తున్నారు మరియు సాధారణ మోసాలను గుర్తించి నివారించడానికి బాగా సిద్ధమైనారు.',
    mediumRiskDescription: 'మీకు సైబర్ సెక్యూరిటీ గురించి మంచి అవగాహన ఉంది కానీ కొన్ని రంగాలలో అదనపు అవగాహన నుండి ప్రయోజనం పొందవచ్చు.',
    highRiskDescription: 'మీరు కొన్ని రకాల సైబర్ దాడులకు హాని కలిగించవచ్చు. అదనపు సైబర్ సెక్యూరిటీ శిక్షణను పరిగణించండి.',
    criticalRiskDescription: 'మీరు సైబర్ నేరాలకు బాధితులు కావడానికి అధిక ప్రమాదంలో ఉన్నారు. తక్షణ సైబర్ సెక్యూరిటీ విద్య బలంగా సిఫార్సు చేయబడింది.',
    correctAnswers: 'సరైన సమాధానాలు',
    totalQuestions: 'మొత్తం ప్రశ్నలు',
    riskLevel: 'ప్రమాద స్థాయి',
    recommendations: 'సిఫార్సులు',
    takeAnotherAssessment: 'మరొక అంచనా తీసుకోండి',
    
    // History
    assessmentHistory: 'అంచనా చరిత్ర',
    viewHistory: 'చరిత్రను చూడండి',
    noAssessmentsYet: 'ఇంకా అంచనలు పూర్తి కాలేదు',
    score: 'స్కోర్',
    
    // Themes
    fakeinfluencergiveawaytrap: 'నకిలీ ప్రభావకుల బహుమతి ట్రాప్',
    romancescam: 'రొమాన్స్ మోసం',
    scamjoboffers: 'మోసపూరిత ఉద్యోగ ఆఫర్లు',
    cheapfashionaccessoryscam: 'చౌక ఫ్యాషన్ & యాక్సెసరీ మోసం',
    fakejobinternshipoffer: 'నకిలీ ఉద్యోగం/ఇంటర్న్‌షిప్ ఆఫర్',
    courierscam: 'కొరియర్ మోసం',
    marketplacescam: 'మార్కెట్‌ప్లేస్ మోసం',
    fakeelectricitybill: 'నకిలీ విద్యుత్ బిల్లు',
    bankingmissedcall: 'బ్యాంకింగ్ మిస్డ్ కాల్',
    fakemedicinehealthscheme: 'నకిలీ మందు/ఆరోగ్య పథకం',
    aadhaarscam: 'ఆధార్ మోసం'
  },
  
  hi: {
    // Common
    back: 'वापस',
    next: 'आगे',
    previous: 'पिछला',
    loading: 'लोड हो रहा है...',
    submit: 'जमा करें',
    cancel: 'रद्द करें',
    save: 'सहेजें',
    
    // Auth
    signIn: 'साइन इन',
    signUp: 'साइन अप',
    signOut: 'साइन आउट',
    email: 'ईमेल',
    password: 'पासवर्ड',
    continueWithGoogle: 'Google के साथ जारी रखें',
    enterYourEmail: 'अपना ईमेल दर्ज करें',
    enterYourPassword: 'अपना पासवर्ड दर्ज करें',
    alreadyHaveAccount: 'पहले से खाता है? साइन इन करें',
    dontHaveAccount: "खाता नहीं है? साइन अप करें",
    checkYourEmail: 'अपना ईमेल जांचें',
    confirmationLinkSent: "हमने आपको एक पुष्टिकरण लिंक भेजा है।",
    authenticationError: 'प्रमाणीकरण त्रुटि',
    googleSignInError: 'Google साइन-इन त्रुटि',
    
    // Profile
    completeProfile: 'अपनी प्रोफ़ाइल पूरी करें',
    name: 'नाम',
    phone: 'फ़ोन नंबर',
    district: 'जिला',
    state: 'राज्य',
    age: 'उम्र',
    enterYourName: 'अपना नाम दर्ज करें',
    enterYourPhone: 'अपना फ़ोन नंबर दर्ज करें',
    enterYourDistrict: 'अपना जिला दर्ज करें',
    enterYourState: 'अपना राज्य दर्ज करें',
    enterYourAge: 'अपनी उम्र दर्ज करें',
    profileUpdated: 'प्रोफ़ाइल सफलतापूर्वक अपडेट हुई!',
    
    // Assessment
    cyrexAssessment: 'साइरेक्स मूल्यांकन',
    cybersecurityAssessmentPlatform: 'साइबर सुरक्षा मूल्यांकन प्लेटफॉर्म',
    chooseYourAgeGroup: 'अपना आयु समूह चुनें',
    selectAgeGroupToStart: 'साइबर सुरक्षा जागरूकता मूल्यांकन शुरू करने के लिए अपना आयु समूह चुनें',
    years: 'वर्ष',
    teenagers: 'किशोर',
    youngAdults: 'युवा वयस्क',
    adults: 'वयस्क',
    seniors: 'वरिष्ठ',
    startAssessment: 'मूल्यांकन शुरू करें',
    loadingAssessment: 'मूल्यांकन लोड हो रहा है...',
    noQuestionsAvailable: 'इस आयु समूह के लिए कोई प्रश्न उपलब्ध नहीं है।',
    scenario: 'परिदृश्य',
    whatWouldYouDo: 'आप क्या करेंगे?',
    submitting: 'जमा कर रहे हैं...',
    
    // Results
    assessmentComplete: 'मूल्यांकन पूर्ण',
    completedOn: 'पूर्ण किया गया',
    lowRiskExcellent: 'कम जोखिम - उत्कृष्ट सुरक्षा जागरूकता!',
    mediumRiskGood: 'मध्यम जोखिम - अच्छी नींव',
    highRiskImprovement: 'उच्च जोखिम - सुधार की आवश्यकता',
    criticalRiskImmediate: 'गंभीर जोखिम - तत्काल कार्रवाई आवश्यक',
    lowRiskDescription: 'आप मजबूत साइबर सुरक्षा जागरूकता प्रदर्शित करते हैं और सामान्य घोटालों की पहचान और बचाव के लिए अच्छी तरह से तैयार हैं।',
    mediumRiskDescription: 'आपके पास साइबर सुरक्षा की ठोस समझ है लेकिन कुछ क्षेत्रों में अतिरिक्त जागरूकता से लाभ हो सकता है।',
    highRiskDescription: 'आप कुछ प्रकार के साइबर हमलों के लिए असुरक्षित हो सकते हैं। अतिरिक्त साइबर सुरक्षा प्रशिक्षण पर विचार करें।',
    criticalRiskDescription: 'आप साइबर अपराधों के शिकार होने के उच्च जोखिम में हैं। तत्काल साइबर सुरक्षा शिक्षा की दृढ़ता से सिफारिश की जाती है।',
    correctAnswers: 'सही उत्तर',
    totalQuestions: 'कुल प्रश्न',
    riskLevel: 'जोखिम स्तर',
    recommendations: 'सिफारिशें',
    takeAnotherAssessment: 'दूसरा मूल्यांकन लें',
    
    // History
    assessmentHistory: 'मूल्यांकन इतिहास',
    viewHistory: 'इतिहास देखें',
    noAssessmentsYet: 'अभी तक कोई मूल्यांकन पूरा नहीं हुआ',
    score: 'स्कोर',
    
    // Themes
    fakeinfluencergiveawaytrap: 'नकली इन्फ्लुएंसर गिवअवे ट्रैप',
    romancescam: 'रोमांस घोटाला',
    scamjoboffers: 'घोटाला नौकरी ऑफर',
    cheapfashionaccessoryscam: 'सस्ते फैशन और एक्सेसरी घोटाला',
    fakejobinternshipoffer: 'नकली नौकरी/इंटर्नशिप ऑफर',
    courierscam: 'कूरियर घोटाला',
    marketplacescam: 'मार्केटप्लेस घोटाला',
    fakeelectricitybill: 'नकली बिजली बिल',
    bankingmissedcall: 'बैंकिंग मिस्ड कॉल',
    fakemedicinehealthscheme: 'नकली दवा/स्वास्थ्य योजना',
    aadhaarscam: 'आधार घोटाला'
  },
  
  ur: {
    // Common
    back: 'واپس',
    next: 'اگلا',
    previous: 'پچھلا',
    loading: 'لوڈ ہو رہا ہے...',
    submit: 'جمع کریں',
    cancel: 'منسوخ کریں',
    save: 'محفوظ کریں',
    
    // Auth
    signIn: 'سائن ان',
    signUp: 'سائن اپ',
    signOut: 'سائن آؤٹ',
    email: 'ای میل',
    password: 'پاس ورڈ',
    continueWithGoogle: 'گوگل کے ساتھ جاری رکھیں',
    enterYourEmail: 'اپنا ای میل درج کریں',
    enterYourPassword: 'اپنا پاس ورڈ درج کریں',
    alreadyHaveAccount: 'پہلے سے اکاؤنٹ ہے؟ سائن ان کریں',
    dontHaveAccount: "اکاؤنٹ نہیں ہے؟ سائن اپ کریں",
    checkYourEmail: 'اپنا ای میل چیک کریں',
    confirmationLinkSent: "ہم نے آپ کو تصدیقی لنک بھیجا ہے۔",
    authenticationError: 'تصدیق کی خرابی',
    googleSignInError: 'گوگل سائن ان کی خرابی',
    
    // Profile
    completeProfile: 'اپنا پروفائل مکمل کریں',
    name: 'نام',
    phone: 'فون نمبر',
    district: 'ضلع',
    state: 'ریاست',
    age: 'عمر',
    enterYourName: 'اپنا نام درج کریں',
    enterYourPhone: 'اپنا فون نمبر درج کریں',
    enterYourDistrict: 'اپنا ضلع درج کریں',
    enterYourState: 'اپنی ریاست درج کریں',
    enterYourAge: 'اپنی عمر درج کریں',
    profileUpdated: 'پروفائل کامیابی سے اپ ڈیٹ ہوا!',
    
    // Assessment
    cyrexAssessment: 'سائریکس تشخیص',
    cybersecurityAssessmentPlatform: 'سائبر سیکیورٹی تشخیص پلیٹ فارم',
    chooseYourAgeGroup: 'اپنا عمری گروپ منتخب کریں',
    selectAgeGroupToStart: 'سائبر سیکیورٹی بیداری کی تشخیص شروع کرنے کے لیے اپنا عمری گروپ منتخب کریں',
    years: 'سال',
    teenagers: 'نوجوان',
    youngAdults: 'نوجوان بالغ',
    adults: 'بالغ',
    seniors: 'بزرگ',
    startAssessment: 'تشخیص شروع کریں',
    loadingAssessment: 'تشخیص لوڈ ہو رہی ہے...',
    noQuestionsAvailable: 'اس عمری گروپ کے لیے کوئی سوالات دستیاب نہیں۔',
    scenario: 'منظر نامہ',
    whatWouldYouDo: 'آپ کیا کریں گے؟',
    submitting: 'جمع کر رہے ہیں...',
    
    // Results
    assessmentComplete: 'تشخیص مکمل',
    completedOn: 'مکمل ہوا',
    lowRiskExcellent: 'کم خطرہ - بہترین سیکیورٹی آگاہی!',
    mediumRiskGood: 'درمیانی خطرہ - اچھی بنیاد',
    highRiskImprovement: 'زیادہ خطرہ - بہتری کی ضرورت',
    criticalRiskImmediate: 'تشویشناک خطرہ - فوری اقدام ضروری',
    lowRiskDescription: 'آپ مضبوط سائبر سیکیورٹی آگاہی کا مظاہرہ کرتے ہیں اور عام فراڈ کی شناخت اور بچاؤ کے لیے اچھی طرح تیار ہیں۔',
    mediumRiskDescription: 'آپ کے پاس سائبر سیکیورٹی کی ٹھوس سمجھ ہے لیکن کچھ علاقوں میں اضافی آگاہی سے فائدہ ہو سکتا ہے۔',
    highRiskDescription: 'آپ کچھ قسم کے سائبر حملوں کے لیے کمزور ہو سکتے ہیں۔ اضافی سائبر سیکیورٹی تربیت پر غور کریں۔',
    criticalRiskDescription: 'آپ سائبر جرائم کا شکار ہونے کے زیادہ خطرے میں ہیں۔ فوری سائبر سیکیورٹی تعلیم کی سختی سے سفارش کی جاتی ہے۔',
    correctAnswers: 'صحیح جوابات',
    totalQuestions: 'کل سوالات',
    riskLevel: 'خطرے کی سطح',
    recommendations: 'سفارشات',
    takeAnotherAssessment: 'دوسری تشخیص کریں',
    
    // History
    assessmentHistory: 'تشخیص کی تاریخ',
    viewHistory: 'تاریخ دیکھیں',
    noAssessmentsYet: 'ابھی تک کوئی تشخیص مکمل نہیں ہوئی',
    score: 'سکور',
    
    // Themes
    fakeinfluencergiveawaytrap: 'جعلی انفلوینسر گیو اوے ٹریپ',
    romancescam: 'رومانس اسکام',
    scamjoboffers: 'اسکام نوکری کی پیشکش',
    cheapfashionaccessoryscam: 'سستے فیشن اور ایکسیسری کا اسکام',
    fakejobinternshipoffer: 'جعلی نوکری/انٹرن شپ پیشکش',
    courierscam: 'کورئیر اسکام',
    marketplacescam: 'مارکیٹ پلیس اسکام',
    fakeelectricitybill: 'جعلی بجلی کا بل',
    bankingmissedcall: 'بینکنگ مسڈ کال',
    fakemedicinehealthscheme: 'جعلی دوا/صحت کی اسکیم',
    aadhaarscam: 'آدھار اسکام'
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['en', 'te', 'hi', 'ur'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language]?.[key as keyof typeof translations['en']] || translations.en[key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
import 'primereact/resources/themes/saga-blue/theme.css';  // Import PrimeReact theme
import 'primereact/resources/primereact.min.css';            // Import PrimeReact core styles
import 'primeicons/primeicons.css';                           // Import PrimeIcons
import '../../css/Settings.css'; 

const Settings = ({ visible, onHide }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState(null);

  // Comprehensive list of languages
  const languages = [
    { label: 'Afrikaans', value: 'af' },
    { label: 'Albanian', value: 'sq' },
    { label: 'Arabic', value: 'ar' },
    { label: 'Armenian', value: 'hy' },
    { label: 'Basque', value: 'eu' },
    { label: 'Bengali', value: 'bn' },
    { label: 'Bosnian', value: 'bs' },
    { label: 'Bulgarian', value: 'bg' },
    { label: 'Catalan', value: 'ca' },
    { label: 'Chinese (Simplified)', value: 'zh' },
    { label: 'Chinese (Traditional)', value: 'zh-TW' },
    { label: 'Croatian', value: 'hr' },
    { label: 'Czech', value: 'cs' },
    { label: 'Danish', value: 'da' },
    { label: 'Dutch', value: 'nl' },
    { label: 'English', value: 'en' },
    { label: 'Estonian', value: 'et' },
    { label: 'Finnish', value: 'fi' },
    { label: 'French', value: 'fr' },
    { label: 'Galician', value: 'gl' },
    { label: 'Georgian', value: 'ka' },
    { label: 'German', value: 'de' },
    { label: 'Greek', value: 'el' },
    { label: 'Gujarati', value: 'gu' },
    { label: 'Haitian Creole', value: 'ht' },
    { label: 'Hebrew', value: 'he' },
    { label: 'Hindi', value: 'hi' },
    { label: 'Hungarian', value: 'hu' },
    { label: 'Icelandic', value: 'is' },
    { label: 'Indonesian', value: 'id' },
    { label: 'Irish', value: 'ga' },
    { label: 'Italian', value: 'it' },
    { label: 'Japanese', value: 'ja' },
    { label: 'Javanese', value: 'jv' },
    { label: 'Kannada', value: 'kn' },
    { label: 'Kazakh', value: 'kk' },
    { label: 'Khmer', value: 'km' },
    { label: 'Korean', value: 'ko' },
    { label: 'Kurdish (Kurmanji)', value: 'ku' },
    { label: 'Kyrgyz', value: 'ky' },
    { label: 'Lao', value: 'lo' },
    { label: 'Latin', value: 'la' },
    { label: 'Latvian', value: 'lv' },
    { label: 'Lithuanian', value: 'lt' },
    { label: 'Luxembourgish', value: 'lb' },
    { label: 'Macedonian', value: 'mk' },
    { label: 'Malagasy', value: 'mg' },
    { label: 'Malay', value: 'ms' },
    { label: 'Malayalam', value: 'ml' },
    { label: 'Maltese', value: 'mt' },
    { label: 'Maori', value: 'mi' },
    { label: 'Marathi', value: 'mr' },
    { label: 'Mongolian', value: 'mn' },
    { label: 'Nepali', value: 'ne' },
    { label: 'Norwegian', value: 'no' },
    { label: 'Pashto', value: 'ps' },
    { label: 'Persian', value: 'fa' },
    { label: 'Polish', value: 'pl' },
    { label: 'Portuguese', value: 'pt' },
    { label: 'Punjabi', value: 'pa' },
    { label: 'Romanian', value: 'ro' },
    { label: 'Russian', value: 'ru' },
    { label: 'Serbian', value: 'sr' },
    { label: 'Sesotho', value: 'st' },
    { label: 'Shona', value: 'sn' },
    { label: 'Sindhi', value: 'sd' },
    { label: 'Sinhala', value: 'si' },
    { label: 'Slovak', value: 'sk' },
    { label: 'Slovenian', value: 'sl' },
    { label: 'Somali', value: 'so' },
    { label: 'Spanish', value: 'es' },
    { label: 'Sundanese', value: 'su' },
    { label: 'Swahili', value: 'sw' },
    { label: 'Swedish', value: 'sv' },
    { label: 'Tajik', value: 'tg' },
    { label: 'Tamil', value: 'ta' },
    { label: 'Telugu', value: 'te' },
    { label: 'Thai', value: 'th' },
    { label: 'Turkish', value: 'tr' },
    { label: 'Ukrainian', value: 'uk' },
    { label: 'Urdu', value: 'ur' },
    { label: 'Uzbek', value: 'uz' },
    { label: 'Vietnamese', value: 'vi' },
    { label: 'Welsh', value: 'cy' },
    { label: 'Xhosa', value: 'xh' },
    { label: 'Yoruba', value: 'yo' },
    { label: 'Zulu', value: 'zu' }
  ];

  const currencies = [
    { label: 'AED - United Arab Emirates Dirham', value: 'AED' },
    { label: 'AFN - Afghan Afghani', value: 'AFN' },
    { label: 'ALL - Albanian Lek', value: 'ALL' },
    { label: 'AMD - Armenian Dram', value: 'AMD' },
    { label: 'ANG - Netherlands Antillean Guilder', value: 'ANG' },
    { label: 'AOA - Angolan Kwanza', value: 'AOA' },
    { label: 'ARS - Argentine Peso', value: 'ARS' },
    { label: 'AUD - Australian Dollar', value: 'AUD' },
    { label: 'AWG - Aruban Florin', value: 'AWG' },
    { label: 'AZN - Azerbaijani Manat', value: 'AZN' },
    { label: 'BAM - Bosnia and Herzegovina Convertible Mark', value: 'BAM' },
    { label: 'BBD - Barbadian Dollar', value: 'BBD' },
    { label: 'BDT - Bangladeshi Taka', value: 'BDT' },
    { label: 'BGN - Bulgarian Lev', value: 'BGN' },
    { label: 'BHD - Bahraini Dinar', value: 'BHD' },
    { label: 'BIF - Burundian Franc', value: 'BIF' },
    { label: 'BMD - Bermudian Dollar', value: 'BMD' },
    { label: 'BND - Brunei Dollar', value: 'BND' },
    { label: 'BOB - Bolivian Boliviano', value: 'BOB' },
    { label: 'BRL - Brazilian Real', value: 'BRL' },
    { label: 'BSD - Bahamian Dollar', value: 'BSD' },
    { label: 'BTN - Bhutanese Ngultrum', value: 'BTN' },
    { label: 'BWP - Botswanan Pula', value: 'BWP' },
    { label: 'BYN - Belarusian Ruble', value: 'BYN' },
    { label: 'BZD - Belize Dollar', value: 'BZD' },
    { label: 'CAD - Canadian Dollar', value: 'CAD' },
    { label: 'CDF - Congolese Franc', value: 'CDF' },
    { label: 'CHF - Swiss Franc', value: 'CHF' },
    { label: 'CLP - Chilean Peso', value: 'CLP' },
    { label: 'CNY - Chinese Yuan', value: 'CNY' },
    { label: 'COP - Colombian Peso', value: 'COP' },
    { label: 'CRC - Costa Rican Colón', value: 'CRC' },
    { label: 'CUP - Cuban Peso', value: 'CUP' },
    { label: 'CVE - Cape Verdean Escudo', value: 'CVE' },
    { label: 'CZK - Czech Koruna', value: 'CZK' },
    { label: 'DJF - Djiboutian Franc', value: 'DJF' },
    { label: 'DKK - Danish Krone', value: 'DKK' },
    { label: 'DOP - Dominican Peso', value: 'DOP' },
    { label: 'DZD - Algerian Dinar', value: 'DZD' },
    { label: 'EGP - Egyptian Pound', value: 'EGP' },
    { label: 'ERN - Eritrean Nakfa', value: 'ERN' },
    { label: 'ETB - Ethiopian Birr', value: 'ETB' },
    { label: 'EUR - Euro', value: 'EUR' },
    { label: 'FJD - Fijian Dollar', value: 'FJD' },
    { label: 'FKP - Falkland Islands Pound', value: 'FKP' },
    { label: 'FOK - Faroese Króna', value: 'FOK' },
    { label: 'GBP - British Pound Sterling', value: 'GBP' },
    { label: 'GEL - Georgian Lari', value: 'GEL' },
    { label: 'GHS - Ghanaian Cedi', value: 'GHS' },
    { label: 'GIP - Gibraltar Pound', value: 'GIP' },
    { label: 'GMD - Gambian Dalasi', value: 'GMD' },
    { label: 'GNF - Guinean Franc', value: 'GNF' },
    { label: 'GTQ - Guatemalan Quetzal', value: 'GTQ' },
    { label: 'GYD - Guyanaese Dollar', value: 'GYD' },
    { label: 'HKD - Hong Kong Dollar', value: 'HKD' },
    { label: 'HNL - Honduran Lempira', value: 'HNL' },
    { label: 'HRK - Croatian Kuna', value: 'HRK' },
    { label: 'HTG - Haitian Gourde', value: 'HTG' },
    { label: 'HUF - Hungarian Forint', value: 'HUF' },
    { label: 'IDR - Indonesian Rupiah', value: 'IDR' },
    { label: 'ILS - Israeli New Shekel', value: 'ILS' },
    { label: 'INR - Indian Rupee', value: 'INR' },
    { label: 'IQD - Iraqi Dinar', value: 'IQD' },
    { label: 'IRR - Iranian Rial', value: 'IRR' },
    { label: 'ISK - Icelandic Króna', value: 'ISK' },
    { label: 'JMD - Jamaican Dollar', value: 'JMD' },
    { label: 'JOD - Jordanian Dinar', value: 'JOD' },
    { label: 'JPY - Japanese Yen', value: 'JPY' },
    { label: 'KES - Kenyan Shilling', value: 'KES' },
    { label: 'KGS - Kyrgystani Som', value: 'KGS' },
    { label: 'KHR - Cambodian Riel', value: 'KHR' },
    { label: 'KID - Kiribati Dollar', value: 'KID' },
    { label: 'KMF - Comorian Franc', value: 'KMF' },
    { label: 'KRW - South Korean Won', value: 'KRW' },
    { label: 'KWD - Kuwaiti Dinar', value: 'KWD' },
    { label: 'KYD - Cayman Islands Dollar', value: 'KYD' },
    { label: 'KZT - Kazakhstani Tenge', value: 'KZT' },
    { label: 'LAK - Laotian Kip', value: 'LAK' },
    { label: 'LBP - Lebanese Pound', value: 'LBP' },
    { label: 'LKR - Sri Lankan Rupee', value: 'LKR' },
    { label: 'LRD - Liberian Dollar', value: 'LRD' },
    { label: 'LSL - Lesotho Loti', value: 'LSL' },
    { label: 'MAD - Moroccan Dirham', value: 'MAD' },
    { label: 'MDL - Moldovan Leu', value: 'MDL' },
    { label: 'MGA - Malagasy Ariary', value: 'MGA' },
    { label: 'MKD - Macedonian Denar', value: 'MKD' },
    { label: 'MMK - Myanma Kyat', value: 'MMK' },
    { label: 'MNT - Mongolian Tugrik', value: 'MNT' },
    { label: 'MOP - Macanese Pataca', value: 'MOP' },
    { label: 'MRU - Mauritanian Ouguiya', value: 'MRU' },
    { label: 'MUR - Mauritian Rupee', value: 'MUR' },
    { label: 'MVR - Maldivian Rufiyaa', value: 'MVR' },
    { label: 'MWK - Malawian Kwacha', value: 'MWK' },
    { label: 'MXN - Mexican Peso', value: 'MXN' },
    { label: 'MYR - Malaysian Ringgit', value: 'MYR' },
    { label: 'MZN - Mozambican Metical', value: 'MZN' },
    { label: 'NAD - Namibian Dollar', value: 'NAD' },
    { label: 'NGN - Nigerian Naira', value: 'NGN' },
    { label: 'NIO - Nicaraguan Córdoba', value: 'NIO' },
    { label: 'NOK - Norwegian Krone', value: 'NOK' },
    { label: 'NPR - Nepalese Rupee', value: 'NPR' },
    { label: 'NZD - New Zealand Dollar', value: 'NZD' },
    { label: 'OMR - Omani Rial', value: 'OMR' },
    { label: 'PAB - Panamanian Balboa', value: 'PAB' },
    { label: 'PEN - Peruvian Nuevo Sol', value: 'PEN' },
    { label: 'PGK - Papua New Guinean Kina', value: 'PGK' },
    { label: 'PHP - Philippine Peso', value: 'PHP' },
    { label: 'PKR - Pakistani Rupee', value: 'PKR' },
    { label: 'PLN - Polish Zloty', value: 'PLN' },
    { label: 'PYG - Paraguayan Guarani', value: 'PYG' },
    { label: 'QAR - Qatari Rial', value: 'QAR' },
    { label: 'RON - Romanian Leu', value: 'RON' },
    { label: 'RSD - Serbian Dinar', value: 'RSD' },
    { label: 'RUB - Russian Ruble', value: 'RUB' },
    { label: 'RWF - Rwandan Franc', value: 'RWF' },
    { label: 'SAR - Saudi Riyal', value: 'SAR' },
    { label: 'SBD - Solomon Islands Dollar', value: 'SBD' },
    { label: 'SCR - Seychellois Rupee', value: 'SCR' },
    { label: 'SDG - Sudanese Pound', value: 'SDG' },
    { label: 'SEK - Swedish Krona', value: 'SEK' },
    { label: 'SGD - Singapore Dollar', value: 'SGD' },
    { label: 'SHP - Saint Helena Pound', value: 'SHP' },
    { label: 'SLL - Sierra Leonean Leone', value: 'SLL' },
    { label: 'SOS - Somali Shilling', value: 'SOS' },
    { label: 'SRD - Surinamese Dollar', value: 'SRD' },
    { label: 'SSP - South Sudanese Pound', value: 'SSP' },
    { label: 'STN - São Tomé and Príncipe Dobra', value: 'STN' },
    { label: 'SYP - Syrian Pound', value: 'SYP' },
    { label: 'SZL - Swazi Lilangeni', value: 'SZL' },
    { label: 'THB - Thai Baht', value: 'THB' },
    { label: 'TJS - Tajikistani Somoni', value: 'TJS' },
    { label: 'TMT - Turkmenistani Manat', value: 'TMT' },
    { label: 'TND - Tunisian Dinar', value: 'TND' },
    { label: 'TOP - Tongan Paʻanga', value: 'TOP' },
    { label: 'TRY - Turkish Lira', value: 'TRY' },
    { label: 'TTD - Trinidad and Tobago Dollar', value: 'TTD' },
    { label: 'TVD - Tuvaluan Dollar', value: 'TVD' },
    { label: 'TWD - New Taiwan Dollar', value: 'TWD' },
    { label: 'TZS - Tanzanian Shilling', value: 'TZS' },
    { label: 'UAH - Ukrainian Hryvnia', value: 'UAH' },
    { label: 'UGX - Ugandan Shilling', value: 'UGX' },
    { label: 'USD - United States Dollar', value: 'USD' },
    { label: 'UYU - Uruguayan Peso', value: 'UYU' },
    { label: 'UZS - Uzbekistani Som', value: 'UZS' },
    { label: 'VEF - Venezuelan Bolívar', value: 'VEF' },
    { label: 'VND - Vietnamese Dong', value: 'VND' },
    { label: 'VUV - Vanuatu Vatu', value: 'VUV' },
    { label: 'WST - Samoan Tala', value: 'WST' },
    { label: 'XAF - Central African CFA Franc', value: 'XAF' },
    { label: 'XAG - Silver Ounce', value: 'XAG' },
    { label: 'XAU - Gold Ounce', value: 'XAU' },
    { label: 'XCD - East Caribbean Dollar', value: 'XCD' },
    { label: 'XDR - Special Drawing Rights', value: 'XDR' },
    { label: 'XOF - West African CFA Franc', value: 'XOF' },
    { label: 'XPF - CFP Franc', value: 'XPF' },
    { label: 'YER - Yemeni Rial', value: 'YER' },
    { label: 'ZAR - South African Rand', value: 'ZAR' },
    { label: 'ZMW - Zambian Kwacha', value: 'ZMW' },
    { label: 'ZWL - Zimbabwean Dollar', value: 'ZWL' }
  ];
  const handleSave = () => {
    // Add save logic here, e.g., updating user preferences
    console.log("Selected Language:", selectedLanguage);
    console.log("Selected Currency:", selectedCurrency);
    
    // Close the dialog
    onHide();
  };

  return (
    <Dialog header="Settings" visible={visible} onHide={onHide} style={{ width: '50vw', maxWidth: '600px' }}>
      <div className="settings-dialog-content" style={{ padding: '1rem' }}>
        <div className="p-field">
          <label htmlFor="language">Current Language</label>
          <Dropdown
            id="language"
            value={selectedLanguage}
            options={languages}
            onChange={(e) => setSelectedLanguage(e.value)}
            placeholder="Select a Language"
            style={{ width: '100%' }}
            filter
          />
        </div>
        <div className="p-field">
          <label htmlFor="currency">Current Currency</label>
          <Dropdown
            id="currency"
            value={selectedCurrency}
            options={currencies}
            onChange={(e) => setSelectedCurrency(e.value)}
            placeholder="Select a Currency"
            style={{ width: '100%' }}
            filter
          />
        </div>
        <div className="settings-dialog-buttons" style={{ marginTop: '1rem' }}>
          <Button
            label="Save"
            icon="pi pi-check"
            onClick={handleSave}
            style={{ marginRight: '10px', backgroundColor: '#06163A', borderRadius: '15px' }}
          />
          <Button
            label="Cancel"
            icon="pi pi-times"
            onClick={onHide}
            className="p-button-danger"
            style={{ marginRight: '10px', borderRadius: '15px' }}
          />
        </div>
      </div>
    </Dialog>
  );
};

export default Settings;
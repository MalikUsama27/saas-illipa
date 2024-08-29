import React, { useState } from "react";
import { Dropdown } from 'primereact/dropdown';

import '../../../css/Flag.css'        

export default function CountryList() {
    const [selectedCountry, setSelectedCountry] = useState(null);

    // The comprehensive list of countries
    const countries = [
        { name: 'Afghanistan', code: 'AF', flag: 'https://flagcdn.com/w20/af.png' },
        { name: 'Albania', code: 'AL', flag: 'https://flagcdn.com/w20/al.png' },
        { name: 'Algeria', code: 'DZ', flag: 'https://flagcdn.com/w20/dz.png' },
        { name: 'Andorra', code: 'AD', flag: 'https://flagcdn.com/w20/ad.png' },
        { name: 'Angola', code: 'AO', flag: 'https://flagcdn.com/w20/ao.png' },
        { name: 'Antigua and Barbuda', code: 'AG', flag: 'https://flagcdn.com/w20/ag.png' },
        { name: 'Argentina', code: 'AR', flag: 'https://flagcdn.com/w20/ar.png' },
        { name: 'Armenia', code: 'AM', flag: 'https://flagcdn.com/w20/am.png' },
        { name: 'Australia', code: 'AU', flag: 'https://flagcdn.com/w20/au.png' },
        { name: 'Austria', code: 'AT', flag: 'https://flagcdn.com/w20/at.png' },
        { name: 'Azerbaijan', code: 'AZ', flag: 'https://flagcdn.com/w20/az.png' },
        { name: 'Bahamas', code: 'BS', flag: 'https://flagcdn.com/w20/bs.png' },
        { name: 'Bahrain', code: 'BH', flag: 'https://flagcdn.com/w20/bh.png' },
        { name: 'Bangladesh', code: 'BD', flag: 'https://flagcdn.com/w20/bd.png' },
        { name: 'Barbados', code: 'BB', flag: 'https://flagcdn.com/w20/bb.png' },
        { name: 'Belarus', code: 'BY', flag: 'https://flagcdn.com/w20/by.png' },
        { name: 'Belgium', code: 'BE', flag: 'https://flagcdn.com/w20/be.png' },
        { name: 'Belize', code: 'BZ', flag: 'https://flagcdn.com/w20/bz.png' },
        { name: 'Benin', code: 'BJ', flag: 'https://flagcdn.com/w20/bj.png' },
        { name: 'Bhutan', code: 'BT', flag: 'https://flagcdn.com/w20/bt.png' },
        { name: 'Bolivia', code: 'BO', flag: 'https://flagcdn.com/w20/bo.png' },
        { name: 'Bosnia and Herzegovina', code: 'BA', flag: 'https://flagcdn.com/w20/ba.png' },
        { name: 'Botswana', code: 'BW', flag: 'https://flagcdn.com/w20/bw.png' },
        { name: 'Brazil', code: 'BR', flag: 'https://flagcdn.com/w20/br.png' },
        { name: 'Brunei', code: 'BN', flag: 'https://flagcdn.com/w20/bn.png' },
        { name: 'Bulgaria', code: 'BG', flag: 'https://flagcdn.com/w20/bg.png' },
        { name: 'Burkina Faso', code: 'BF', flag: 'https://flagcdn.com/w20/bf.png' },
        { name: 'Burundi', code: 'BI', flag: 'https://flagcdn.com/w20/bi.png' },
        { name: 'Cabo Verde', code: 'CV', flag: 'https://flagcdn.com/w20/cv.png' },
        { name: 'Cambodia', code: 'KH', flag: 'https://flagcdn.com/w20/kh.png' },
        { name: 'Cameroon', code: 'CM', flag: 'https://flagcdn.com/w20/cm.png' },
        { name: 'Canada', code: 'CA', flag: 'https://flagcdn.com/w20/ca.png' },
        { name: 'Central African Republic', code: 'CF', flag: 'https://flagcdn.com/w20/cf.png' },
        { name: 'Chad', code: 'TD', flag: 'https://flagcdn.com/w20/td.png' },
        { name: 'Chile', code: 'CL', flag: 'https://flagcdn.com/w20/cl.png' },
        { name: 'China', code: 'CN', flag: 'https://flagcdn.com/w20/cn.png' },
        { name: 'Colombia', code: 'CO', flag: 'https://flagcdn.com/w20/co.png' },
        { name: 'Comoros', code: 'KM', flag: 'https://flagcdn.com/w20/km.png' },
        { name: 'Congo (Congo-Brazzaville)', code: 'CG', flag: 'https://flagcdn.com/w20/cg.png' },
        { name: 'Costa Rica', code: 'CR', flag: 'https://flagcdn.com/w20/cr.png' },
        { name: 'Croatia', code: 'HR', flag: 'https://flagcdn.com/w20/hr.png' },
        { name: 'Cuba', code: 'CU', flag: 'https://flagcdn.com/w20/cu.png' },
        { name: 'Cyprus', code: 'CY', flag: 'https://flagcdn.com/w20/cy.png' },
        { name: 'Czechia (Czech Republic)', code: 'CZ', flag: 'https://flagcdn.com/w20/cz.png' },
        { name: 'Denmark', code: 'DK', flag: 'https://flagcdn.com/w20/dk.png' },
        { name: 'Djibouti', code: 'DJ', flag: 'https://flagcdn.com/w20/dj.png' },
        { name: 'Dominica', code: 'DM', flag: 'https://flagcdn.com/w20/dm.png' },
        { name: 'Dominican Republic', code: 'DO', flag: 'https://flagcdn.com/w20/do.png' },
        { name: 'Ecuador', code: 'EC', flag: 'https://flagcdn.com/w20/ec.png' },
        { name: 'Egypt', code: 'EG', flag: 'https://flagcdn.com/w20/eg.png' },
        { name: 'El Salvador', code: 'SV', flag: 'https://flagcdn.com/w20/sv.png' },
        { name: 'Equatorial Guinea', code: 'GQ', flag: 'https://flagcdn.com/w20/gq.png' },
        { name: 'Eritrea', code: 'ER', flag: 'https://flagcdn.com/w20/er.png' },
        { name: 'Estonia', code: 'EE', flag: 'https://flagcdn.com/w20/ee.png' },
        { name: 'Eswatini (fmr. "Swaziland")', code: 'SZ', flag: 'https://flagcdn.com/w20/sz.png' },
        { name: 'Ethiopia', code: 'ET', flag: 'https://flagcdn.com/w20/et.png' },
        { name: 'Fiji', code: 'FJ', flag: 'https://flagcdn.com/w20/fj.png' },
        { name: 'Finland', code: 'FI', flag: 'https://flagcdn.com/w20/fi.png' },
        { name: 'France', code: 'FR', flag: 'https://flagcdn.com/w20/fr.png' },
        { name: 'Gabon', code: 'GA', flag: 'https://flagcdn.com/w20/ga.png' },
        { name: 'Gambia', code: 'GM', flag: 'https://flagcdn.com/w20/gm.png' },
        { name: 'Georgia', code: 'GE', flag: 'https://flagcdn.com/w20/ge.png' },
        { name: 'Germany', code: 'DE', flag: 'https://flagcdn.com/w20/de.png' },
        { name: 'Ghana', code: 'GH', flag: 'https://flagcdn.com/w20/gh.png' },
        { name: 'Greece', code: 'GR', flag: 'https://flagcdn.com/w20/gr.png' },
        { name: 'Grenada', code: 'GD', flag: 'https://flagcdn.com/w20/gd.png' },
        { name: 'Guatemala', code: 'GT', flag: 'https://flagcdn.com/w20/gt.png' },
        { name: 'Guinea', code: 'GN', flag: 'https://flagcdn.com/w20/gn.png' },
        { name: 'Guinea-Bissau', code: 'GW', flag: 'https://flagcdn.com/w20/gw.png' },
        { name: 'Guyana', code: 'GY', flag: 'https://flagcdn.com/w20/gy.png' },
        { name: 'Haiti', code: 'HT', flag: 'https://flagcdn.com/w20/ht.png' },
        { name: 'Honduras', code: 'HN', flag: 'https://flagcdn.com/w20/hn.png' },
        { name: 'Hungary', code: 'HU', flag: 'https://flagcdn.com/w20/hu.png' },
        { name: 'Iceland', code: 'IS', flag: 'https://flagcdn.com/w20/is.png' },
        { name: 'India', code: 'IN', flag: 'https://flagcdn.com/w20/in.png' },
        { name: 'Indonesia', code: 'ID', flag: 'https://flagcdn.com/w20/id.png' },
        { name: 'Iran', code: 'IR', flag: 'https://flagcdn.com/w20/ir.png' },
        { name: 'Iraq', code: 'IQ', flag: 'https://flagcdn.com/w20/iq.png' },
        { name: 'Ireland', code: 'IE', flag: 'https://flagcdn.com/w20/ie.png' },
        { name: 'Israel', code: 'IL', flag: 'https://flagcdn.com/w20/il.png' },
        { name: 'Italy', code: 'IT', flag: 'https://flagcdn.com/w20/it.png' },
        { name: 'Jamaica', code: 'JM', flag: 'https://flagcdn.com/w20/jm.png' },
        { name: 'Japan', code: 'JP', flag: 'https://flagcdn.com/w20/jp.png' },
        { name: 'Jordan', code: 'JO', flag: 'https://flagcdn.com/w20/jo.png' },
        { name: 'Kazakhstan', code: 'KZ', flag: 'https://flagcdn.com/w20/kz.png' },
        { name: 'Kenya', code: 'KE', flag: 'https://flagcdn.com/w20/ke.png' },
        { name: 'Kiribati', code: 'KI', flag: 'https://flagcdn.com/w20/ki.png' },
        { name: 'Korea (North)', code: 'KP', flag: 'https://flagcdn.com/w20/kp.png' },
        { name: 'Korea (South)', code: 'KR', flag: 'https://flagcdn.com/w20/kr.png' },
        { name: 'Kosovo', code: 'XK', flag: 'https://flagcdn.com/w20/xk.png' },
        { name: 'Kuwait', code: 'KW', flag: 'https://flagcdn.com/w20/kw.png' },
        { name: 'Kyrgyzstan', code: 'KG', flag: 'https://flagcdn.com/w20/kg.png' },
        { name: 'Laos', code: 'LA', flag: 'https://flagcdn.com/w20/la.png' },
        { name: 'Latvia', code: 'LV', flag: 'https://flagcdn.com/w20/lv.png' },
        { name: 'Lebanon', code: 'LB', flag: 'https://flagcdn.com/w20/lb.png' },
        { name: 'Lesotho', code: 'LS', flag: 'https://flagcdn.com/w20/ls.png' },
        { name: 'Liberia', code: 'LR', flag: 'https://flagcdn.com/w20/lr.png' },
        { name: 'Libya', code: 'LY', flag: 'https://flagcdn.com/w20/ly.png' },
        { name: 'Liechtenstein', code: 'LI', flag: 'https://flagcdn.com/w20/li.png' },
        { name: 'Lithuania', code: 'LT', flag: 'https://flagcdn.com/w20/lt.png' },
        { name: 'Luxembourg', code: 'LU', flag: 'https://flagcdn.com/w20/lu.png' },
        { name: 'Madagascar', code: 'MG', flag: 'https://flagcdn.com/w20/mg.png' },
        { name: 'Malawi', code: 'MW', flag: 'https://flagcdn.com/w20/mw.png' },
        { name: 'Malaysia', code: 'MY', flag: 'https://flagcdn.com/w20/my.png' },
        { name: 'Maldives', code: 'MV', flag: 'https://flagcdn.com/w20/mv.png' },
        { name: 'Mali', code: 'ML', flag: 'https://flagcdn.com/w20/ml.png' },
        { name: 'Malta', code: 'MT', flag: 'https://flagcdn.com/w20/mt.png' },
        { name: 'Marshall Islands', code: 'MH', flag: 'https://flagcdn.com/w20/mh.png' },
        { name: 'Mauritania', code: 'MR', flag: 'https://flagcdn.com/w20/mr.png' },
        { name: 'Mauritius', code: 'MU', flag: 'https://flagcdn.com/w20/mu.png' },
        { name: 'Mexico', code: 'MX', flag: 'https://flagcdn.com/w20/mx.png' },
        { name: 'Micronesia', code: 'FM', flag: 'https://flagcdn.com/w20/fm.png' },
        { name: 'Moldova', code: 'MD', flag: 'https://flagcdn.com/w20/md.png' },
        { name: 'Monaco', code: 'MC', flag: 'https://flagcdn.com/w20/mc.png' },
        { name: 'Mongolia', code: 'MN', flag: 'https://flagcdn.com/w20/mn.png' },
        { name: 'Montenegro', code: 'ME', flag: 'https://flagcdn.com/w20/me.png' },
        { name: 'Morocco', code: 'MA', flag: 'https://flagcdn.com/w20/ma.png' },
        { name: 'Mozambique', code: 'MZ', flag: 'https://flagcdn.com/w20/mz.png' },
        { name: 'Myanmar (Burma)', code: 'MM', flag: 'https://flagcdn.com/w20/mm.png' },
        { name: 'Namibia', code: 'NA', flag: 'https://flagcdn.com/w20/na.png' },
        { name: 'Nauru', code: 'NR', flag: 'https://flagcdn.com/w20/nr.png' },
        { name: 'Nepal', code: 'NP', flag: 'https://flagcdn.com/w20/np.png' },
        { name: 'Netherlands', code: 'NL', flag: 'https://flagcdn.com/w20/nl.png' },
        { name: 'New Zealand', code: 'NZ', flag: 'https://flagcdn.com/w20/nz.png' },
        { name: 'Nicaragua', code: 'NI', flag: 'https://flagcdn.com/w20/ni.png' },
        { name: 'Niger', code: 'NE', flag: 'https://flagcdn.com/w20/ne.png' },
        { name: 'Nigeria', code: 'NG', flag: 'https://flagcdn.com/w20/ng.png' },
        { name: 'North Macedonia', code: 'MK', flag: 'https://flagcdn.com/w20/mk.png' },
        { name: 'Norway', code: 'NO', flag: 'https://flagcdn.com/w20/no.png' },
        { name: 'Oman', code: 'OM', flag: 'https://flagcdn.com/w20/om.png' },
        { name: 'Pakistan', code: 'PK', flag: 'https://flagcdn.com/w20/pk.png' },
        { name: 'Palau', code: 'PW', flag: 'https://flagcdn.com/w20/pw.png' },
        { name: 'Palestine State', code: 'PS', flag: 'https://flagcdn.com/w20/ps.png' },
        { name: 'Panama', code: 'PA', flag: 'https://flagcdn.com/w20/pa.png' },
        { name: 'Papua New Guinea', code: 'PG', flag: 'https://flagcdn.com/w20/pg.png' },
        { name: 'Paraguay', code: 'PY', flag: 'https://flagcdn.com/w20/py.png' },
        { name: 'Peru', code: 'PE', flag: 'https://flagcdn.com/w20/pe.png' },
        { name: 'Philippines', code: 'PH', flag: 'https://flagcdn.com/w20/ph.png' },
        { name: 'Poland', code: 'PL', flag: 'https://flagcdn.com/w20/pl.png' },
        { name: 'Portugal', code: 'PT', flag: 'https://flagcdn.com/w20/pt.png' },
        { name: 'Qatar', code: 'QA', flag: 'https://flagcdn.com/w20/qa.png' },
        { name: 'Romania', code: 'RO', flag: 'https://flagcdn.com/w20/ro.png' },
        { name: 'Russia', code: 'RU', flag: 'https://flagcdn.com/w20/ru.png' },
        { name: 'Rwanda', code: 'RW', flag: 'https://flagcdn.com/w20/rw.png' },
        { name: 'Saint Kitts and Nevis', code: 'KN', flag: 'https://flagcdn.com/w20/kn.png' },
        { name: 'Saint Lucia', code: 'LC', flag: 'https://flagcdn.com/w20/lc.png' },
        { name: 'Saint Vincent and the Grenadines', code: 'VC', flag: 'https://flagcdn.com/w20/vc.png' },
        { name: 'Samoa', code: 'WS', flag: 'https://flagcdn.com/w20/ws.png' },
        { name: 'San Marino', code: 'SM', flag: 'https://flagcdn.com/w20/sm.png' },
        { name: 'Sao Tome and Principe', code: 'ST', flag: 'https://flagcdn.com/w20/st.png' },
        { name: 'Saudi Arabia', code: 'SA', flag: 'https://flagcdn.com/w20/sa.png' },
        { name: 'Senegal', code: 'SN', flag: 'https://flagcdn.com/w20/sn.png' },
        { name: 'Serbia', code: 'RS', flag: 'https://flagcdn.com/w20/rs.png' },
        { name: 'Seychelles', code: 'SC', flag: 'https://flagcdn.com/w20/sc.png' },
        { name: 'Sierra Leone', code: 'SL', flag: 'https://flagcdn.com/w20/sl.png' },
        { name: 'Singapore', code: 'SG', flag: 'https://flagcdn.com/w20/sg.png' },
        { name: 'Slovakia', code: 'SK', flag: 'https://flagcdn.com/w20/sk.png' },
        { name: 'Slovenia', code: 'SI', flag: 'https://flagcdn.com/w20/si.png' },
        { name: 'Solomon Islands', code: 'SB', flag: 'https://flagcdn.com/w20/sb.png' },
        { name: 'Somalia', code: 'SO', flag: 'https://flagcdn.com/w20/so.png' },
        { name: 'South Africa', code: 'ZA', flag: 'https://flagcdn.com/w20/za.png' },
        { name: 'South Sudan', code: 'SS', flag: 'https://flagcdn.com/w20/ss.png' },
        { name: 'Spain', code: 'ES', flag: 'https://flagcdn.com/w20/es.png' },
        { name: 'Sri Lanka', code: 'LK', flag: 'https://flagcdn.com/w20/lk.png' },
        { name: 'Sudan', code: 'SD', flag: 'https://flagcdn.com/w20/sd.png' },
        { name: 'Suriname', code: 'SR', flag: 'https://flagcdn.com/w20/sr.png' },
        { name: 'Sweden', code: 'SE', flag: 'https://flagcdn.com/w20/se.png' },
        { name: 'Switzerland', code: 'CH', flag: 'https://flagcdn.com/w20/ch.png' },
        { name: 'Syria', code: 'SY', flag: 'https://flagcdn.com/w20/sy.png' },
        { name: 'Taiwan', code: 'TW', flag: 'https://flagcdn.com/w20/tw.png' },
        { name: 'Tajikistan', code: 'TJ', flag: 'https://flagcdn.com/w20/tj.png' },
        { name: 'Tanzania', code: 'TZ', flag: 'https://flagcdn.com/w20/tz.png' },
        { name: 'Thailand', code: 'TH', flag: 'https://flagcdn.com/w20/th.png' },
        { name: 'Timor-Leste', code: 'TL', flag: 'https://flagcdn.com/w20/tl.png' },
        { name: 'Turkey', code: 'TR', flag: 'https://flagcdn.com/w20/tr.png' },
        { name: 'Turkmenistan', code: 'TM', flag: 'https://flagcdn.com/w20/tm.png' },
        { name: 'Tuvalu', code: 'TV', flag: 'https://flagcdn.com/w20/tv.png' },
        { name: 'Uganda', code: 'UG', flag: 'https://flagcdn.com/w20/ug.png' },
        { name: 'Ukraine', code: 'UA', flag: 'https://flagcdn.com/w20/ua.png' },
        { name: 'United Arab Emirates', code: 'AE', flag: 'https://flagcdn.com/w20/ae.png' },
        { name: 'United Kingdom', code: 'GB', flag: 'https://flagcdn.com/w20/gb.png' },
        { name: 'United States of America', code: 'US', flag: 'https://flagcdn.com/w20/us.png' },
        { name: 'Uruguay', code: 'UY', flag: 'https://flagcdn.com/w20/uy.png' },
        { name: 'Uzbekistan', code: 'UZ', flag: 'https://flagcdn.com/w20/uz.png' },
        { name: 'Vanuatu', code: 'VU', flag: 'https://flagcdn.com/w20/vu.png' },
        { name: 'Vatican City', code: 'VA', flag: 'https://flagcdn.com/w20/va.png' },
        { name: 'Venezuela', code: 'VE', flag: 'https://flagcdn.com/w20/ve.png' },
        { name: 'Vietnam', code: 'VN', flag: 'https://flagcdn.com/w20/vn.png' },
        { name: 'Yemen', code: 'YE', flag: 'https://flagcdn.com/w20/ye.png' },
        { name: 'Zambia', code: 'ZM', flag: 'https://flagcdn.com/w20/zm.png' },
        { name: 'Zimbabwe', code: 'ZW', flag: 'https://flagcdn.com/w20/zw.png' }
    ];
    

    const selectedCountryTemplate = (option, props) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <img
                        alt={option.name}
                        src={option.flag}
                        className="mr-2"
                        style={{ width: '24px', height: '16px' }} // Adjust dimensions as needed
                    />
                    <span>{option.name}</span>
                </div>
            );
        }
        return <span>{props.placeholder}</span>;
    };

    const countryOptionTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <img
                    alt={option.name}
                    src={option.flag}
                    className="mr-2"
                    style={{ width: '24px', height: '16px'}} // Adjust dimensions as needed
                />
                <span style={{paddingLeft:'10%', alignContent:'center',alignSelf:'center'}}>{option.name}</span>
            </div>
        );
    };

    return (
        <div className="card flex justify-content-center">
            <Dropdown
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.value)}
                options={countries}
                optionLabel="name"
                placeholder="Select a Country"
                filter
                valueTemplate={selectedCountryTemplate}
                itemTemplate={countryOptionTemplate}
                className="w-full md:w-14rem"
            />
        </div>
    );
}
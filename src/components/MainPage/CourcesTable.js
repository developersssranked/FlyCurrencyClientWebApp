import CourcesRow from './CourcesRow';

import '../../css/MainPage/cources_table.css'
import { Fragment } from 'react/jsx-runtime';
import rubImage from '../../img/main_page_cources/rub.png'
import usdtImage from '../../img/main_page_cources/usdt.png'
import usdImage from '../../img/main_page_cources/usd.png'
import eurImage from '../../img/main_page_cources/eur.png'
import uahImage from '../../img/main_page_cources/uah.png'
import kztImage from '../../img/main_page_cources/kzt.png'
import { useLocation } from 'react-router-dom';

function CourcesTable({rates, activeOption, setPageActiveOption}) {
    const { pathname, search } = useLocation();
    
    return <div className='main-page-cources-table'>
                <div className='main-page-cources-table-header'>
                    <div className='main-page-cources-table-header-item'>Currency</div>
                    <div className='main-page-cources-table-header-subcolumns'>
                        <div className='main-page-cources-table-header-item'>Rate buy</div>
                        <div className='main-page-cources-table-header-item'>Rate sell</div>
                    </div>
                </div>
                <div className='main-page-cources-breakline'/>
                    {pathname === '/rates' ? (
                        <Fragment>
                            <CourcesRow
                            image={rubImage}
                            alt="rub"
                            title="RUB"
                            courceBuy={
                                activeOption === 'THB'
                                ? rates?.rub_thb != null ? (rates.rub_thb * 1.04).toFixed(3) : ''
                                : rates?.rub_vnd != null ? Math.round(rates.rub_vnd * 0.96) : ''
                            }
                            courceSell={
                                activeOption === 'THB'
                                ? rates?.thb_rub != null ? (rates.thb_rub * 0.96).toFixed(3) : ''
                                : rates?.vnd_rub != null ? Math.round(rates.vnd_rub * 1.04) : ''
                            }
                            activeOption={activeOption}
                            setPageActiveOption={setPageActiveOption}
                            />
                            <CourcesRow
                            image={usdtImage}
                            alt="usdt"
                            title="USDT"
                            courceBuy={
                                activeOption === 'THB'
                                ? rates?.usdt_thb != null ? (rates.usdt_thb * 0.97).toFixed(3) : ''
                                : rates?.usdt_vnd != null ? Math.round(rates.usdt_vnd * 0.96) : ''
                            }
                            courceSell={
                                activeOption === 'THB'
                                ? rates?.thb_usdt != null ? (rates.thb_usdt * 1.03).toFixed(3) : ''
                                : rates?.vnd_usdt != null ? Math.round(rates.vnd_usdt * 1.04) : ''
                            }
                            activeOption={activeOption}
                            setPageActiveOption={setPageActiveOption}
                            />
                            <CourcesRow
                            image={usdImage}
                            alt="usd"
                            title="USD"
                            courceBuy={
                                activeOption === 'THB'
                                ? rates?.usd_thb != null ? (rates.usd_thb * 0.98).toFixed(3) : ''
                                : rates?.usd_vnd != null ? Math.round(rates.usd_vnd * 0.96) : ''
                            }
                            courceSell={
                                activeOption === 'THB'
                                ? rates?.thb_usd != null ? (rates.thb_usd * 1.02).toFixed(3) : ''
                                : rates?.vnd_usd != null ? Math.round(rates.vnd_usd * 1.04) : ''
                            }
                            activeOption={activeOption}
                            setPageActiveOption={setPageActiveOption}
                            />
                            {activeOption === 'THB' && (
                            <Fragment>
                                <CourcesRow
                                image={eurImage}
                                alt="eur"
                                title="EUR"
                                courceBuy={rates?.eur_thb != null ? (rates.eur_thb * 0.98).toFixed(3) : ''}
                                courceSell={rates?.thb_eur != null ? (rates.thb_eur * 1.02).toFixed(3) : ''}
                                activeOption={activeOption}
                                setPageActiveOption={setPageActiveOption}
                                />
                                <CourcesRow
                                image={uahImage}
                                alt="uah"
                                title="UAH"
                                courceBuy="-"
                                courceSell={rates?.thb_uah != null ? (rates.thb_uah * 0.95).toFixed(3) : ''}
                                activeOption={activeOption}
                                setPageActiveOption={setPageActiveOption}
                                />
                                <CourcesRow
                                image={kztImage}
                                alt="kzt"
                                title="KZT"
                                courceBuy="-"
                                courceSell={rates?.thb_kzt != null ? (rates.thb_kzt * 0.95).toFixed(3) : ''}
                                activeOption={activeOption}
                                setPageActiveOption={setPageActiveOption}
                                />
                            </Fragment>
                            )}
                            <div className="main-page-cources-breakline" />
                        </Fragment>
                        ) : (
                        <Fragment>
                            <CourcesRow
                            image={rubImage}
                            alt="rub"
                            title="RUB"
                            courceBuy={
                                activeOption === 'THB'
                                ? rates?.rub_thb != null ? (rates.rub_thb * 1.04).toFixed(3) : ''
                                : rates?.rub_vnd != null ? Math.round(rates.rub_vnd * 0.96) : ''
                            }
                            courceSell={
                                activeOption === 'THB'
                                ? rates?.thb_rub != null ? (rates.thb_rub * 0.96).toFixed(3) : ''
                                : rates?.vnd_rub != null ? Math.round(rates.vnd_rub * 1.04) : ''
                            }
                            activeOption={activeOption}
                            setPageActiveOption={setPageActiveOption}
                            />
                            <CourcesRow
                            image={usdtImage}
                            alt="usdt"
                            title="USDT"
                            courceBuy={
                                activeOption === 'THB'
                                ? rates?.usdt_thb != null ? (rates.usdt_thb * 0.97).toFixed(3) : ''
                                : rates?.usdt_vnd != null ? Math.round(rates.usdt_vnd * 0.96) : ''
                            }
                            courceSell={
                                activeOption === 'THB'
                                ? rates?.thb_usdt != null ? (rates.thb_usdt * 1.03).toFixed(3) : ''
                                : rates?.vnd_usdt != null ? Math.round(rates.vnd_usdt * 1.04) : ''
                            }
                            activeOption={activeOption}
                            setPageActiveOption={setPageActiveOption}
                            />
                            <CourcesRow
                            image={usdImage}
                            alt="usd"
                            title="USD"
                            courceBuy={
                                activeOption === 'THB'
                                ? rates?.usd_thb != null ? (rates.usd_thb * 0.98).toFixed(3) : ''
                                : rates?.usd_vnd != null ? Math.round(rates.usd_vnd * 0.96) : ''
                            }
                            courceSell={
                                activeOption === 'THB'
                                ? rates?.thb_usd != null ? (rates.thb_usd * 1.02).toFixed(3) : ''
                                : rates?.vnd_usd != null ? Math.round(rates.vnd_usd * 1.04) : ''
                            }
                            activeOption={activeOption}
                            setPageActiveOption={setPageActiveOption}
                            />
                            {activeOption === 'THB' && (
                            <Fragment>
                                <CourcesRow
                                image={eurImage}
                                alt="eur"
                                title="EUR"
                                courceBuy={rates?.eur_thb != null ? (rates.eur_thb * 0.98).toFixed(3) : ''}
                                courceSell={rates?.thb_eur != null ? (rates.thb_eur * 1.02).toFixed(3) : ''}
                                activeOption={activeOption}
                                setPageActiveOption={setPageActiveOption}
                                />
                            </Fragment>
                            )}
                        </Fragment>
                        )}
                    
            </div>
};

export default CourcesTable;
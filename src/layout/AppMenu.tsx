/* eslint-disable @next/next/no-img-element */

import React, { useContext } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import { AppMenuItem } from '../types/types';

const AppMenu = () => {
    const { layoutConfig } = useContext(LayoutContext);

    const model: AppMenuItem[] = [
        {
            label: 'Home',
            items: [{ label: 'Welcome', icon: 'pi pi-fw pi-home', to: '/' }]
        },
        {
            label: 'workflow',
            items: [
                { label: 'workflows', icon: 'pi pi-fw pi-id-card', to: '/workflows' },
                { label: 'templates', icon: 'pi pi-fw pi-box', to: '/uikit/input' }
            ]
        },
        {
            label: 'Devices',
            items: [
                { label: 'NB-IoT', icon: 'pi pi-fw pi-eye', to: '/blocks', badge: 'NEW' },
                { label: 'ZigBee', icon: 'pi pi-fw pi-globe', url: '', target: '_blank' }
            ]
        },
        {
            label: 'Reports',
            items: [
                { label: 'Dashboard', icon: 'pi pi-fw pi-chart-bar', to: '/utilities/icons' },
                { label: 'Support', icon: 'pi pi-fw pi-compass', to: '/utilities/icons' },
                { label: 'Health', icon: 'pi pi-fw pi-heart', url: '', target: '_blank' }
            ]
        }
    ];

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;

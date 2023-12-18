'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">SmåJobs documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/ActiveChatPageModule.html" data-type="entity-link" >ActiveChatPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ActiveChatPageModule-e21782d00f63d8925161a52f50dea44be417a74c392dfc8a076ad0503c55255eaf841ea1b1b14d4b7776d40ce1cf2d09baf0505c0bfe3251362e37538b90281f"' : 'data-bs-target="#xs-components-links-module-ActiveChatPageModule-e21782d00f63d8925161a52f50dea44be417a74c392dfc8a076ad0503c55255eaf841ea1b1b14d4b7776d40ce1cf2d09baf0505c0bfe3251362e37538b90281f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ActiveChatPageModule-e21782d00f63d8925161a52f50dea44be417a74c392dfc8a076ad0503c55255eaf841ea1b1b14d4b7776d40ce1cf2d09baf0505c0bfe3251362e37538b90281f"' :
                                            'id="xs-components-links-module-ActiveChatPageModule-e21782d00f63d8925161a52f50dea44be417a74c392dfc8a076ad0503c55255eaf841ea1b1b14d4b7776d40ce1cf2d09baf0505c0bfe3251362e37538b90281f"' }>
                                            <li class="link">
                                                <a href="components/ActiveChatPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ActiveChatPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ActiveChatPageRoutingModule.html" data-type="entity-link" >ActiveChatPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AddNewJobPageModule.html" data-type="entity-link" >AddNewJobPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AddNewJobPageModule-ff2553e5d8accb368f0ed97164e7e329da8dac79e9a5637b8c361ffa034d381f507c892296dca28b73dd7a9d00b3be221bcb6aa500d2affd0ecf53fe1f41f99e"' : 'data-bs-target="#xs-components-links-module-AddNewJobPageModule-ff2553e5d8accb368f0ed97164e7e329da8dac79e9a5637b8c361ffa034d381f507c892296dca28b73dd7a9d00b3be221bcb6aa500d2affd0ecf53fe1f41f99e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AddNewJobPageModule-ff2553e5d8accb368f0ed97164e7e329da8dac79e9a5637b8c361ffa034d381f507c892296dca28b73dd7a9d00b3be221bcb6aa500d2affd0ecf53fe1f41f99e"' :
                                            'id="xs-components-links-module-AddNewJobPageModule-ff2553e5d8accb368f0ed97164e7e329da8dac79e9a5637b8c361ffa034d381f507c892296dca28b73dd7a9d00b3be221bcb6aa500d2affd0ecf53fe1f41f99e"' }>
                                            <li class="link">
                                                <a href="components/AddNewJobPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddNewJobPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AddNewJobPageRoutingModule.html" data-type="entity-link" >AddNewJobPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-eb2fc49870b1dd5f0edd092da25706a50fe149c2a6eaa0cf2830750c3c319af933aaa635cd225795f391e331c2ba07bbbd270d547c1ee5c9442aad8f519c9271"' : 'data-bs-target="#xs-components-links-module-AppModule-eb2fc49870b1dd5f0edd092da25706a50fe149c2a6eaa0cf2830750c3c319af933aaa635cd225795f391e331c2ba07bbbd270d547c1ee5c9442aad8f519c9271"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-eb2fc49870b1dd5f0edd092da25706a50fe149c2a6eaa0cf2830750c3c319af933aaa635cd225795f391e331c2ba07bbbd270d547c1ee5c9442aad8f519c9271"' :
                                            'id="xs-components-links-module-AppModule-eb2fc49870b1dd5f0edd092da25706a50fe149c2a6eaa0cf2830750c3c319af933aaa635cd225795f391e331c2ba07bbbd270d547c1ee5c9442aad8f519c9271"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-eb2fc49870b1dd5f0edd092da25706a50fe149c2a6eaa0cf2830750c3c319af933aaa635cd225795f391e331c2ba07bbbd270d547c1ee5c9442aad8f519c9271"' : 'data-bs-target="#xs-injectables-links-module-AppModule-eb2fc49870b1dd5f0edd092da25706a50fe149c2a6eaa0cf2830750c3c319af933aaa635cd225795f391e331c2ba07bbbd270d547c1ee5c9442aad8f519c9271"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-eb2fc49870b1dd5f0edd092da25706a50fe149c2a6eaa0cf2830750c3c319af933aaa635cd225795f391e331c2ba07bbbd270d547c1ee5c9442aad8f519c9271"' :
                                        'id="xs-injectables-links-module-AppModule-eb2fc49870b1dd5f0edd092da25706a50fe149c2a6eaa0cf2830750c3c319af933aaa635cd225795f391e331c2ba07bbbd270d547c1ee5c9442aad8f519c9271"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ChatPageModule.html" data-type="entity-link" >ChatPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ChatPageModule-78e9260086a414e5a5833c6ad3c51e62ab54916e80233a9d1a797c06d446436ecc5130d4d41c0fb2f429f7c2e0a959cc7664120832fd97374a6f0c783ff35e82"' : 'data-bs-target="#xs-components-links-module-ChatPageModule-78e9260086a414e5a5833c6ad3c51e62ab54916e80233a9d1a797c06d446436ecc5130d4d41c0fb2f429f7c2e0a959cc7664120832fd97374a6f0c783ff35e82"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ChatPageModule-78e9260086a414e5a5833c6ad3c51e62ab54916e80233a9d1a797c06d446436ecc5130d4d41c0fb2f429f7c2e0a959cc7664120832fd97374a6f0c783ff35e82"' :
                                            'id="xs-components-links-module-ChatPageModule-78e9260086a414e5a5833c6ad3c51e62ab54916e80233a9d1a797c06d446436ecc5130d4d41c0fb2f429f7c2e0a959cc7664120832fd97374a6f0c783ff35e82"' }>
                                            <li class="link">
                                                <a href="components/ChatPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChatPage</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#pipes-links-module-ChatPageModule-78e9260086a414e5a5833c6ad3c51e62ab54916e80233a9d1a797c06d446436ecc5130d4d41c0fb2f429f7c2e0a959cc7664120832fd97374a6f0c783ff35e82"' : 'data-bs-target="#xs-pipes-links-module-ChatPageModule-78e9260086a414e5a5833c6ad3c51e62ab54916e80233a9d1a797c06d446436ecc5130d4d41c0fb2f429f7c2e0a959cc7664120832fd97374a6f0c783ff35e82"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-ChatPageModule-78e9260086a414e5a5833c6ad3c51e62ab54916e80233a9d1a797c06d446436ecc5130d4d41c0fb2f429f7c2e0a959cc7664120832fd97374a6f0c783ff35e82"' :
                                            'id="xs-pipes-links-module-ChatPageModule-78e9260086a414e5a5833c6ad3c51e62ab54916e80233a9d1a797c06d446436ecc5130d4d41c0fb2f429f7c2e0a959cc7664120832fd97374a6f0c783ff35e82"' }>
                                            <li class="link">
                                                <a href="pipes/WordLimitPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WordLimitPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ChatPageRoutingModule.html" data-type="entity-link" >ChatPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/FiltermodalPageModule.html" data-type="entity-link" >FiltermodalPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-FiltermodalPageModule-d231683dd7cfd77da50b89e7b2585452c7d271d23196123592a451e5aaa1cb74c3aed53d51bd046e387c02fe287f186f320022c35311080afe4bd64c3b1ac3e7"' : 'data-bs-target="#xs-components-links-module-FiltermodalPageModule-d231683dd7cfd77da50b89e7b2585452c7d271d23196123592a451e5aaa1cb74c3aed53d51bd046e387c02fe287f186f320022c35311080afe4bd64c3b1ac3e7"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-FiltermodalPageModule-d231683dd7cfd77da50b89e7b2585452c7d271d23196123592a451e5aaa1cb74c3aed53d51bd046e387c02fe287f186f320022c35311080afe4bd64c3b1ac3e7"' :
                                            'id="xs-components-links-module-FiltermodalPageModule-d231683dd7cfd77da50b89e7b2585452c7d271d23196123592a451e5aaa1cb74c3aed53d51bd046e387c02fe287f186f320022c35311080afe4bd64c3b1ac3e7"' }>
                                            <li class="link">
                                                <a href="components/FiltermodalPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FiltermodalPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/FiltermodalPageRoutingModule.html" data-type="entity-link" >FiltermodalPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ForgotPasswordModalPageModule.html" data-type="entity-link" >ForgotPasswordModalPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ForgotPasswordModalPageModule-e45c64bf71fa9a783120745472e6b8799f8ee8ebca7e62ab5e9b91d307b66b4bcd0e583e86126bd37a1ef0fcfcaf8dae2b472a03e6d5f157b95410bcc2db0476"' : 'data-bs-target="#xs-components-links-module-ForgotPasswordModalPageModule-e45c64bf71fa9a783120745472e6b8799f8ee8ebca7e62ab5e9b91d307b66b4bcd0e583e86126bd37a1ef0fcfcaf8dae2b472a03e6d5f157b95410bcc2db0476"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ForgotPasswordModalPageModule-e45c64bf71fa9a783120745472e6b8799f8ee8ebca7e62ab5e9b91d307b66b4bcd0e583e86126bd37a1ef0fcfcaf8dae2b472a03e6d5f157b95410bcc2db0476"' :
                                            'id="xs-components-links-module-ForgotPasswordModalPageModule-e45c64bf71fa9a783120745472e6b8799f8ee8ebca7e62ab5e9b91d307b66b4bcd0e583e86126bd37a1ef0fcfcaf8dae2b472a03e6d5f157b95410bcc2db0476"' }>
                                            <li class="link">
                                                <a href="components/ForgotPasswordModalPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ForgotPasswordModalPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ForgotPasswordModalPageRoutingModule.html" data-type="entity-link" >ForgotPasswordModalPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ForgotPasswordPageModule.html" data-type="entity-link" >ForgotPasswordPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ForgotPasswordPageModule-ea5b8a10881146e26f9f022cd781e572228e8b2a081284ba73c2df58912d87d8189953250f7be25a4059ba7ce1733fd4c56e43cb3c1f48b975f164099abdc175"' : 'data-bs-target="#xs-components-links-module-ForgotPasswordPageModule-ea5b8a10881146e26f9f022cd781e572228e8b2a081284ba73c2df58912d87d8189953250f7be25a4059ba7ce1733fd4c56e43cb3c1f48b975f164099abdc175"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ForgotPasswordPageModule-ea5b8a10881146e26f9f022cd781e572228e8b2a081284ba73c2df58912d87d8189953250f7be25a4059ba7ce1733fd4c56e43cb3c1f48b975f164099abdc175"' :
                                            'id="xs-components-links-module-ForgotPasswordPageModule-ea5b8a10881146e26f9f022cd781e572228e8b2a081284ba73c2df58912d87d8189953250f7be25a4059ba7ce1733fd4c56e43cb3c1f48b975f164099abdc175"' }>
                                            <li class="link">
                                                <a href="components/ForgotPasswordPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ForgotPasswordPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ForgotPasswordPageRoutingModule.html" data-type="entity-link" >ForgotPasswordPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/HomePageModule.html" data-type="entity-link" >HomePageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-HomePageModule-9d719537a6bffdbda4fd0d853f6550765faaae64f5a4c0f08e61a213697ee6983b6247578483fe9ddb1b2cc0f6801ac58ff04a1d4e1ce0ca444630cfc9430b06"' : 'data-bs-target="#xs-components-links-module-HomePageModule-9d719537a6bffdbda4fd0d853f6550765faaae64f5a4c0f08e61a213697ee6983b6247578483fe9ddb1b2cc0f6801ac58ff04a1d4e1ce0ca444630cfc9430b06"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HomePageModule-9d719537a6bffdbda4fd0d853f6550765faaae64f5a4c0f08e61a213697ee6983b6247578483fe9ddb1b2cc0f6801ac58ff04a1d4e1ce0ca444630cfc9430b06"' :
                                            'id="xs-components-links-module-HomePageModule-9d719537a6bffdbda4fd0d853f6550765faaae64f5a4c0f08e61a213697ee6983b6247578483fe9ddb1b2cc0f6801ac58ff04a1d4e1ce0ca444630cfc9430b06"' }>
                                            <li class="link">
                                                <a href="components/HomePage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomePage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HomePageRoutingModule.html" data-type="entity-link" >HomePageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/IntroPageModule.html" data-type="entity-link" >IntroPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-IntroPageModule-bcd10e7d9d21a89d04fedcc7ebb8a49c7cf7fb16c373b10d8888d758d83df16cb75608f9947b8254c62d5fb12f0ab64fbb4ffce2082d70649a507af8527073fb"' : 'data-bs-target="#xs-components-links-module-IntroPageModule-bcd10e7d9d21a89d04fedcc7ebb8a49c7cf7fb16c373b10d8888d758d83df16cb75608f9947b8254c62d5fb12f0ab64fbb4ffce2082d70649a507af8527073fb"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-IntroPageModule-bcd10e7d9d21a89d04fedcc7ebb8a49c7cf7fb16c373b10d8888d758d83df16cb75608f9947b8254c62d5fb12f0ab64fbb4ffce2082d70649a507af8527073fb"' :
                                            'id="xs-components-links-module-IntroPageModule-bcd10e7d9d21a89d04fedcc7ebb8a49c7cf7fb16c373b10d8888d758d83df16cb75608f9947b8254c62d5fb12f0ab64fbb4ffce2082d70649a507af8527073fb"' }>
                                            <li class="link">
                                                <a href="components/IntroPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >IntroPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/IntroPageRoutingModule.html" data-type="entity-link" >IntroPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/JobDetailsPageModule.html" data-type="entity-link" >JobDetailsPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-JobDetailsPageModule-607cb80321be51e26f3f97152d117f26e1f3590f9ce0c1bb348756addc73b82da8d54073ce5b08c4b5fc6286f037a04ddb422439851473da07f49a236f3a46bf"' : 'data-bs-target="#xs-components-links-module-JobDetailsPageModule-607cb80321be51e26f3f97152d117f26e1f3590f9ce0c1bb348756addc73b82da8d54073ce5b08c4b5fc6286f037a04ddb422439851473da07f49a236f3a46bf"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-JobDetailsPageModule-607cb80321be51e26f3f97152d117f26e1f3590f9ce0c1bb348756addc73b82da8d54073ce5b08c4b5fc6286f037a04ddb422439851473da07f49a236f3a46bf"' :
                                            'id="xs-components-links-module-JobDetailsPageModule-607cb80321be51e26f3f97152d117f26e1f3590f9ce0c1bb348756addc73b82da8d54073ce5b08c4b5fc6286f037a04ddb422439851473da07f49a236f3a46bf"' }>
                                            <li class="link">
                                                <a href="components/JobDetailsPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JobDetailsPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/JobDetailsPageRoutingModule.html" data-type="entity-link" >JobDetailsPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LoginPageModule.html" data-type="entity-link" >LoginPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-LoginPageModule-5354525ceb561f2b0ab6243523e874ee391420060008b480de099d291240cff161a15831c4d31d121b4419ca3fb092edbf37ea5626abb0af648ecaa3591d470d"' : 'data-bs-target="#xs-components-links-module-LoginPageModule-5354525ceb561f2b0ab6243523e874ee391420060008b480de099d291240cff161a15831c4d31d121b4419ca3fb092edbf37ea5626abb0af648ecaa3591d470d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LoginPageModule-5354525ceb561f2b0ab6243523e874ee391420060008b480de099d291240cff161a15831c4d31d121b4419ca3fb092edbf37ea5626abb0af648ecaa3591d470d"' :
                                            'id="xs-components-links-module-LoginPageModule-5354525ceb561f2b0ab6243523e874ee391420060008b480de099d291240cff161a15831c4d31d121b4419ca3fb092edbf37ea5626abb0af648ecaa3591d470d"' }>
                                            <li class="link">
                                                <a href="components/LoginPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LoginPageRoutingModule.html" data-type="entity-link" >LoginPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LogoutModalPageModule.html" data-type="entity-link" >LogoutModalPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-LogoutModalPageModule-fdd1f20425caee3b61f0a6a9ffc32267e3becdaaabe8ed492654e5477b82ca5c276ab8a00d8b942ea653d538614467fc5e05f5100779da52a7eb9c9fd8deaabd"' : 'data-bs-target="#xs-components-links-module-LogoutModalPageModule-fdd1f20425caee3b61f0a6a9ffc32267e3becdaaabe8ed492654e5477b82ca5c276ab8a00d8b942ea653d538614467fc5e05f5100779da52a7eb9c9fd8deaabd"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LogoutModalPageModule-fdd1f20425caee3b61f0a6a9ffc32267e3becdaaabe8ed492654e5477b82ca5c276ab8a00d8b942ea653d538614467fc5e05f5100779da52a7eb9c9fd8deaabd"' :
                                            'id="xs-components-links-module-LogoutModalPageModule-fdd1f20425caee3b61f0a6a9ffc32267e3becdaaabe8ed492654e5477b82ca5c276ab8a00d8b942ea653d538614467fc5e05f5100779da52a7eb9c9fd8deaabd"' }>
                                            <li class="link">
                                                <a href="components/LogoutModalPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LogoutModalPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LogoutModalPageRoutingModule.html" data-type="entity-link" >LogoutModalPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/NotFoundPageModule.html" data-type="entity-link" >NotFoundPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-NotFoundPageModule-abefc2c01c32ce45006891dd04a710a45a18b5c9d22bd0398728cb0da5edc6d4964fe256107b5660a99be80c669aaeaac4b908ffc88f4b828a5897b2cd4b08a0"' : 'data-bs-target="#xs-components-links-module-NotFoundPageModule-abefc2c01c32ce45006891dd04a710a45a18b5c9d22bd0398728cb0da5edc6d4964fe256107b5660a99be80c669aaeaac4b908ffc88f4b828a5897b2cd4b08a0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NotFoundPageModule-abefc2c01c32ce45006891dd04a710a45a18b5c9d22bd0398728cb0da5edc6d4964fe256107b5660a99be80c669aaeaac4b908ffc88f4b828a5897b2cd4b08a0"' :
                                            'id="xs-components-links-module-NotFoundPageModule-abefc2c01c32ce45006891dd04a710a45a18b5c9d22bd0398728cb0da5edc6d4964fe256107b5660a99be80c669aaeaac4b908ffc88f4b828a5897b2cd4b08a0"' }>
                                            <li class="link">
                                                <a href="components/NotFoundPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NotFoundPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/NotFoundPageRoutingModule.html" data-type="entity-link" >NotFoundPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/OnAuthPageModule.html" data-type="entity-link" >OnAuthPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-OnAuthPageModule-4d8325fcfb61071874048cece3a19a8a613d08603bb0a98c2d25840b15fd9b19e89cb184a0d4d0c4cf32fcfd6b03a61729f71a4fcf3d86c296ecfc2bf1c00a1c"' : 'data-bs-target="#xs-components-links-module-OnAuthPageModule-4d8325fcfb61071874048cece3a19a8a613d08603bb0a98c2d25840b15fd9b19e89cb184a0d4d0c4cf32fcfd6b03a61729f71a4fcf3d86c296ecfc2bf1c00a1c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-OnAuthPageModule-4d8325fcfb61071874048cece3a19a8a613d08603bb0a98c2d25840b15fd9b19e89cb184a0d4d0c4cf32fcfd6b03a61729f71a4fcf3d86c296ecfc2bf1c00a1c"' :
                                            'id="xs-components-links-module-OnAuthPageModule-4d8325fcfb61071874048cece3a19a8a613d08603bb0a98c2d25840b15fd9b19e89cb184a0d4d0c4cf32fcfd6b03a61729f71a4fcf3d86c296ecfc2bf1c00a1c"' }>
                                            <li class="link">
                                                <a href="components/OnAuthPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OnAuthPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/OnAuthPageRoutingModule.html" data-type="entity-link" >OnAuthPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PrivacyPolicyPageModule.html" data-type="entity-link" >PrivacyPolicyPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-PrivacyPolicyPageModule-f18d82b84fd7e9bfdd74701187a4050fb2d395d7165da208fa1367a1fb01bd89574931064fb50f78cead8442128856ca08b3a5020e0c0464ffea589750a9974d"' : 'data-bs-target="#xs-components-links-module-PrivacyPolicyPageModule-f18d82b84fd7e9bfdd74701187a4050fb2d395d7165da208fa1367a1fb01bd89574931064fb50f78cead8442128856ca08b3a5020e0c0464ffea589750a9974d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PrivacyPolicyPageModule-f18d82b84fd7e9bfdd74701187a4050fb2d395d7165da208fa1367a1fb01bd89574931064fb50f78cead8442128856ca08b3a5020e0c0464ffea589750a9974d"' :
                                            'id="xs-components-links-module-PrivacyPolicyPageModule-f18d82b84fd7e9bfdd74701187a4050fb2d395d7165da208fa1367a1fb01bd89574931064fb50f78cead8442128856ca08b3a5020e0c0464ffea589750a9974d"' }>
                                            <li class="link">
                                                <a href="components/PrivacyPolicyPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrivacyPolicyPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PrivacyPolicyPageRoutingModule.html" data-type="entity-link" >PrivacyPolicyPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ProfilePageModule.html" data-type="entity-link" >ProfilePageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ProfilePageModule-31132f6849536d25eb665692c7c375969564eab3e5ce2541b31f8f4dd977878b42584963289b067a5f23b929fa716116c4c916421b51b50e73cc0473c6f2cec9"' : 'data-bs-target="#xs-components-links-module-ProfilePageModule-31132f6849536d25eb665692c7c375969564eab3e5ce2541b31f8f4dd977878b42584963289b067a5f23b929fa716116c4c916421b51b50e73cc0473c6f2cec9"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ProfilePageModule-31132f6849536d25eb665692c7c375969564eab3e5ce2541b31f8f4dd977878b42584963289b067a5f23b929fa716116c4c916421b51b50e73cc0473c6f2cec9"' :
                                            'id="xs-components-links-module-ProfilePageModule-31132f6849536d25eb665692c7c375969564eab3e5ce2541b31f8f4dd977878b42584963289b067a5f23b929fa716116c4c916421b51b50e73cc0473c6f2cec9"' }>
                                            <li class="link">
                                                <a href="components/ProfilePage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProfilePage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProfilePageRoutingModule.html" data-type="entity-link" >ProfilePageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/RegisterPageModule.html" data-type="entity-link" >RegisterPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-RegisterPageModule-7e953ee3170a2fe6a19b1942725f09ce5ccb8fa36a3cf990f323a5208a1cb44d22b440fe71a16d3b98063e14e30e2ee3efb34d48e5698ce828933ff3ddb14299"' : 'data-bs-target="#xs-components-links-module-RegisterPageModule-7e953ee3170a2fe6a19b1942725f09ce5ccb8fa36a3cf990f323a5208a1cb44d22b440fe71a16d3b98063e14e30e2ee3efb34d48e5698ce828933ff3ddb14299"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RegisterPageModule-7e953ee3170a2fe6a19b1942725f09ce5ccb8fa36a3cf990f323a5208a1cb44d22b440fe71a16d3b98063e14e30e2ee3efb34d48e5698ce828933ff3ddb14299"' :
                                            'id="xs-components-links-module-RegisterPageModule-7e953ee3170a2fe6a19b1942725f09ce5ccb8fa36a3cf990f323a5208a1cb44d22b440fe71a16d3b98063e14e30e2ee3efb34d48e5698ce828933ff3ddb14299"' }>
                                            <li class="link">
                                                <a href="components/RegisterPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RegisterPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/RegisterPageRoutingModule.html" data-type="entity-link" >RegisterPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/StartPageModule.html" data-type="entity-link" >StartPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-StartPageModule-434c12069fffc597a1600e13ac7bb3e61b2b5647e007c35fb0c738277b01e0214d9d46a5d16ec4b84c644e8dea8c5e9defcc426ff59bfc2444ffdd376834bc46"' : 'data-bs-target="#xs-components-links-module-StartPageModule-434c12069fffc597a1600e13ac7bb3e61b2b5647e007c35fb0c738277b01e0214d9d46a5d16ec4b84c644e8dea8c5e9defcc426ff59bfc2444ffdd376834bc46"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-StartPageModule-434c12069fffc597a1600e13ac7bb3e61b2b5647e007c35fb0c738277b01e0214d9d46a5d16ec4b84c644e8dea8c5e9defcc426ff59bfc2444ffdd376834bc46"' :
                                            'id="xs-components-links-module-StartPageModule-434c12069fffc597a1600e13ac7bb3e61b2b5647e007c35fb0c738277b01e0214d9d46a5d16ec4b84c644e8dea8c5e9defcc426ff59bfc2444ffdd376834bc46"' }>
                                            <li class="link">
                                                <a href="components/StartPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StartPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/StartPageRoutingModule.html" data-type="entity-link" >StartPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/UpdateJobPageModule.html" data-type="entity-link" >UpdateJobPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-UpdateJobPageModule-489e3896757ba99be57000e83c9ff527afdb2b2a352a37f1435a93854b6d0b28284e52800060dcf48e24d938ba199999f06d8e68461a89fdcaaef125b1d0e6c1"' : 'data-bs-target="#xs-components-links-module-UpdateJobPageModule-489e3896757ba99be57000e83c9ff527afdb2b2a352a37f1435a93854b6d0b28284e52800060dcf48e24d938ba199999f06d8e68461a89fdcaaef125b1d0e6c1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UpdateJobPageModule-489e3896757ba99be57000e83c9ff527afdb2b2a352a37f1435a93854b6d0b28284e52800060dcf48e24d938ba199999f06d8e68461a89fdcaaef125b1d0e6c1"' :
                                            'id="xs-components-links-module-UpdateJobPageModule-489e3896757ba99be57000e83c9ff527afdb2b2a352a37f1435a93854b6d0b28284e52800060dcf48e24d938ba199999f06d8e68461a89fdcaaef125b1d0e6c1"' }>
                                            <li class="link">
                                                <a href="components/UpdateJobPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UpdateJobPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UpdateJobPageRoutingModule.html" data-type="entity-link" >UpdateJobPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/UpdateProfilePageModule.html" data-type="entity-link" >UpdateProfilePageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-UpdateProfilePageModule-f6627ebc0cada02c062f4fab42f70b95dc2893e29cc6906bcf284625b9d0c55e2190d710d4da20b5c6e93a102ae29ef1e63af2281c32284350dc13af6cd8f40d"' : 'data-bs-target="#xs-components-links-module-UpdateProfilePageModule-f6627ebc0cada02c062f4fab42f70b95dc2893e29cc6906bcf284625b9d0c55e2190d710d4da20b5c6e93a102ae29ef1e63af2281c32284350dc13af6cd8f40d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UpdateProfilePageModule-f6627ebc0cada02c062f4fab42f70b95dc2893e29cc6906bcf284625b9d0c55e2190d710d4da20b5c6e93a102ae29ef1e63af2281c32284350dc13af6cd8f40d"' :
                                            'id="xs-components-links-module-UpdateProfilePageModule-f6627ebc0cada02c062f4fab42f70b95dc2893e29cc6906bcf284625b9d0c55e2190d710d4da20b5c6e93a102ae29ef1e63af2281c32284350dc13af6cd8f40d"' }>
                                            <li class="link">
                                                <a href="components/UpdateProfilePage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UpdateProfilePage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UpdateProfilePageRoutingModule.html" data-type="entity-link" >UpdateProfilePageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ViewProfilePageModule.html" data-type="entity-link" >ViewProfilePageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ViewProfilePageModule-4d8c7291d1f860adf14159985a7a5952a3e98bd951b6ecf822e910048ecb2d7e77cb0789ed38f6775788e808ea483855a229749e04075eca9aeddd2a9bc59788"' : 'data-bs-target="#xs-components-links-module-ViewProfilePageModule-4d8c7291d1f860adf14159985a7a5952a3e98bd951b6ecf822e910048ecb2d7e77cb0789ed38f6775788e808ea483855a229749e04075eca9aeddd2a9bc59788"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ViewProfilePageModule-4d8c7291d1f860adf14159985a7a5952a3e98bd951b6ecf822e910048ecb2d7e77cb0789ed38f6775788e808ea483855a229749e04075eca9aeddd2a9bc59788"' :
                                            'id="xs-components-links-module-ViewProfilePageModule-4d8c7291d1f860adf14159985a7a5952a3e98bd951b6ecf822e910048ecb2d7e77cb0789ed38f6775788e808ea483855a229749e04075eca9aeddd2a9bc59788"' }>
                                            <li class="link">
                                                <a href="components/ViewProfilePage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ViewProfilePage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ViewProfilePageRoutingModule.html" data-type="entity-link" >ViewProfilePageRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Category.html" data-type="entity-link" >Category</a>
                            </li>
                            <li class="link">
                                <a href="classes/Jobs.html" data-type="entity-link" >Jobs</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ChatService.html" data-type="entity-link" >ChatService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JobService.html" data-type="entity-link" >JobService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/IntroGuard.html" data-type="entity-link" >IntroGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});
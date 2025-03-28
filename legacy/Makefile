init:
	cd .. && git clone git@github.com:Cryptic-Activist/admin-cryptic-activist-catalog.git
	cd .. && git clone git@github.com:Cryptic-Activist/api-user-cryptic-activist.git
	cd .. && git clone git@github.com:Cryptic-Activist/api-fiat-cryptic-activist.git
	cd .. && git clone git@github.com:Cryptic-Activist/api-cryptocurrency-cryptic-activist.git
	cd .. && git clone git@github.com:Cryptic-Activist/api-chat-cryptic-activist.git
	cd .. && git clone git@github.com:Cryptic-Activist/api-offer-cryptic-activist.git
	cd .. && git clone git@github.com:Cryptic-Activist/api-trade-cryptic-activist.git
	cd .. && git clone git@github.com:Cryptic-Activist/cryptic-utils.git
	cd .. && git clone git@github.com:Cryptic-Activist/cryptic-base.git
	cd .. && git clone git@github.com:Cryptic-Activist/cryptic-components.git
	cd .. && git clone git@github.com:Cryptic-Activist/cryptic-redux.git

	make link

	cd ../api-user-cryptic-activist && yarn
	cd ../api-fiat-cryptic-activist && yarn
	cd ../api-cryptocurrency-cryptic-activist && yarn
	cd ../api-chat-cryptic-activist && yarn
	cd ../api-offer-cryptic-activist && yarn
	cd ../api-trade-cryptic-activist && yarn
	cd ../cryptic-utils && yarn && yarn build
	cd ../cryptic-base && yarn
	cd ../cryptic-components && yarn
	cd ../cryptic-redux && yarn
	cd ../admin-cryptic-activist-catalog && yarn

	make dev
	
	cd ../cryptic-utils && node -e 'require("./dist/src/generators/environment.js").setupEnvironment()'

dev:
	gnome-terminal --tab --working-directory=$(abspath $(dir $(lastword $(MAKEFILE_LIST)))/../admin-cryptic-activist-catalog) -t "Admin Front-end" -e "yarn dev"
	gnome-terminal --tab --working-directory=$(abspath $(dir $(lastword $(MAKEFILE_LIST)))/../api-user-cryptic-activist) -t "User API" -e "yarn dev"
	gnome-terminal --tab --working-directory=$(abspath $(dir $(lastword $(MAKEFILE_LIST)))/../api-fiat-cryptic-activist) -t "Fiat API" -e "yarn dev"
	gnome-terminal --tab --working-directory=$(abspath $(dir $(lastword $(MAKEFILE_LIST)))/../api-cryptocurrency-cryptic-activist) -t "Cryptocurrency API" -e "yarn dev"
	gnome-terminal --tab --working-directory=$(abspath $(dir $(lastword $(MAKEFILE_LIST)))/../api-trade-cryptic-activist) -t "Trade API" -e "yarn dev"
	gnome-terminal --tab --working-directory=$(abspath $(dir $(lastword $(MAKEFILE_LIST)))/../api-offer-cryptic-activist) -t "Offer API" -e "yarn dev"
	gnome-terminal --tab --working-directory=$(abspath $(dir $(lastword $(MAKEFILE_LIST)))/../api-chat-cryptic-activist) -t "Chat API" -e "yarn dev"

	yarn dev

link:
	cd ../cryptic-utils && yarn link
	cd ../cryptic-base && yarn link
	cd ../cryptic-components && yarn link
	cd ../cryptic-redux && yarn link
	cd ../base-ca && yarn link

	cd ../api-user-cryptic-activist && yarn link "cryptic-base" && yarn link "cryptic-utils" && yarn link "cryptic-components" && yarn link "cryptic-redux" && yarn link "base-ca"
	cd ../api-fiat-cryptic-activist && yarn link "cryptic-base" && yarn link "cryptic-utils" && yarn link "cryptic-components" && yarn link "cryptic-redux" && yarn link "base-ca"
	cd ../api-cryptocurrency-cryptic-activist && yarn link "cryptic-base" && yarn link "cryptic-utils" && yarn link "cryptic-components" && yarn link "cryptic-redux" && yarn link "base-ca"
	cd ../api-trade-cryptic-activist && yarn link "cryptic-base" && yarn link "cryptic-utils" && yarn link "cryptic-components" && yarn link "cryptic-redux" && yarn link "base-ca"
	cd ../api-offer-cryptic-activist && yarn link "cryptic-base" && yarn link "cryptic-utils" && yarn link "cryptic-components" && yarn link "cryptic-redux" && yarn link "base-ca"
	cd ../api-chat-cryptic-activist && yarn link "cryptic-base" && yarn link "cryptic-utils" && yarn link "cryptic-components" && yarn link "cryptic-redux" && yarn link "base-ca"
	cd ../cryptic-activist-catalog && yarn link "cryptic-base" && yarn link "cryptic-utils" && yarn link "cryptic-components" && yarn link "cryptic-redux" && yarn link "base-ca"
	cd ../cryptic-utils && yarn link "cryptic-base" && yarn link "cryptic-components" && yarn link "cryptic-redux" && yarn link "base-ca"
	cd ../cryptic-base && yarn link "cryptic-utils" && yarn link "cryptic-components" && yarn link "cryptic-redux" && yarn link "base-ca"
	cd ../cryptic-components && yarn link "cryptic-base" && yarn link "cryptic-utils" && yarn link "cryptic-redux" && yarn link "base-ca"
	cd ../cryptic-redux && yarn link "cryptic-base" && yarn link "cryptic-components" && yarn link "cryptic-utils" && yarn link "base-ca"


unlink:
	cd ../api-user-cryptic-activist && yarn unlink "cryptic-base" && yarn unlink "cryptic-utils" && yarn unlink "cryptic-components" && yarn unlink "cryptic-redux" && yarn unlink "base-ca"
	cd ../api-fiat-cryptic-activist && yarn unlink "cryptic-base" && yarn unlink "cryptic-utils" && yarn unlink "cryptic-components" && yarn unlink "cryptic-redux" && yarn unlink "base-ca"
	cd ../api-cryptocurrency-cryptic-activist && yarn unlink "cryptic-base" && yarn unlink "cryptic-utils" && yarn unlink "cryptic-components" && yarn unlink "cryptic-redux" && yarn unlink "base-ca"
	cd ../api-trade-cryptic-activist && yarn unlink "cryptic-base" && yarn unlink "cryptic-utils" && yarn unlink "cryptic-components" && yarn unlink "cryptic-redux" && yarn unlink "base-ca"
	cd ../api-offer-cryptic-activist && yarn unlink "cryptic-base" && yarn unlink "cryptic-utils" && yarn unlink "cryptic-components" && yarn unlink "cryptic-redux" && yarn unlink "base-ca"
	cd ../api-chat-cryptic-activist && yarn unlink "cryptic-base" && yarn unlink "cryptic-utils" && yarn unlink "cryptic-components" && yarn unlink "cryptic-redux" && yarn unlink "base-ca"
	cd ../cryptic-activist-catalog && yarn unlink "cryptic-base" && yarn unlink "cryptic-utils" && yarn unlink "cryptic-components" && yarn unlink "cryptic-redux" && yarn unlink "base-ca"
	cd ../cryptic-utils && yarn unlink "cryptic-base" && yarn unlink "cryptic-components" && yarn unlink "cryptic-redux"
	cd ../cryptic-base && yarn unlink "cryptic-utils" && yarn unlink "cryptic-components" && yarn unlink "cryptic-redux"
	cd ../cryptic-components && yarn unlink "cryptic-base" && yarn unlink "cryptic-utils" && yarn unlink "cryptic-redux"
	cd ../cryptic-redux && yarn unlink "cryptic-base" && yarn unlink "cryptic-components" && yarn unlink "cryptic-utils"

	cd ../cryptic-utils && yarn unlink
	cd ../cryptic-base && yarn unlink
	cd ../cryptic-components && yarn unlink
	cd ../cryptic-redux && yarn unlink
	cd ../base-ca && yarn unlink

install:
	cd ../api-user-cryptic-activist && yarn
	cd ../api-fiat-cryptic-activist && yarn
	cd ../api-cryptocurrency-cryptic-activist && yarn
	cd ../api-chat-cryptic-activist && yarn
	cd ../api-offer-cryptic-activist && yarn
	cd ../api-trade-cryptic-activist && yarn
	cd ../cryptic-utils && yarn && yarn build
	cd ../cryptic-base && yarn && yarn build
	cd ../cryptic-components && yarn && yarn build
	cd ../cryptic-redux && yarn && yarn build
	cd ../base-ca && yarn && yarn build

clean:
	cd ../api-user-cryptic-activist && rm -rf ./node_modules package-lock.json yarn.lock
	cd ../api-fiat-cryptic-activist && rm -rf ./node_modules package-lock.json yarn.lock
	cd ../api-cryptocurrency-cryptic-activist && rm -rf ./node_modules package-lock.json yarn.lock
	cd ../api-chat-cryptic-activist && rm -rf ./node_modules package-lock.json yarn.lock
	cd ../api-offer-cryptic-activist && rm -rf ./node_modules package-lock.json yarn.lock
	cd ../api-trade-cryptic-activist && rm -rf ./node_modules package-lock.json yarn.lock
	cd ../cryptic-utils && rm -rf ./node_modules package-lock.json yarn.lock && rm -rf ./node_modules package-lock.json yarn.lock
	cd ../cryptic-base && rm -rf ./node_modules package-lock.json yarn.lock
	cd ../cryptic-components && rm -rf ./node_modules package-lock.json yarn.lock
	cd ../cryptic-redux && rm -rf ./node_modules package-lock.json yarn.lock
	rm -rf ./node_modules package-lock.json yarn.lock

env:
	cd ../cryptic-utils && node -e 'require("./dist/generators/environment.js").setupEnvironment()'

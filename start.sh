#!/bin/bash

# Cores do output do terminal
textColorBlack=$(tput setaf 0)
textColorRed=$(tput setaf 1)
textColorGreen=$(tput setaf 2)
textColorYellow=$(tput setaf 3)
textColorBlue=$(tput setaf 4)
textColorMagenta=$(tput setaf 5)
textColorCyan=$(tput setaf 6)
endOfText=$(tput sgr 0)

function startBackend() {
    cd pokemon-jokenpo-backend

    npm run dev
}

function startFrontEnd() {
    cd pokemon-jokenpo-frontend

    yarn start
}

function startUnitaryTests() {
    cd pokemon-jokenpo-test

    npm run cypress:open
}


# INICIA O AMBIENTE DE DESENVOLVIMENTO
echo $textColorBlue'Iniciando as aplicações'$endOfText

# startBackend
echo $textColorGreen'Ambiente do Back-end running'$endOfText
# startFrontEnd
echo $textColorGreen'Ambiente do Front-end running'$endOfText
# startUnitaryTests
echo $textColorGreen'Ambiente de Testes running'$endOfText
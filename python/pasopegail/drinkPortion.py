import mouse as mo
import keyboard as keys
import time
import configparser
import os
import keyEvent as ke

try:    
    import serialFunc as sf
    ser = sf.ExternalHID('COM16')
except Exception as e:
    print(e)
    print("Hardware Macro Disabled")

def generateKeyEvent(val, key_s, delay):
    if val == True:
        for outVal in key_s:
            # hardware macro
            #ser.keyboardInput(outVal)
            # software macro
            ke.press(outVal)
            time.sleep(delay)


def drinkPortionWithInput(listDevKeyOutVal, delay=0.001):
    listKeyState = [0] * len(listDevKeyOutVal)

    while True:
        for idx, dictDevVal in enumerate(listDevKeyOutVal):
            keyormo = list(dictDevVal.keys())[0]
            generateKeys = dictDevVal[keyormo].split(',')

            # [0] = k is keyboard [1] = pushed key
            if keyormo.split('_')[0].strip() == 'k':
                value = keys.is_pressed(keyormo.split('_')[1].strip())
                if listKeyState[idx] != value:
                    generateKeyEvent(value, generateKeys, delay)
                    listKeyState[idx] = value

            # [0] = m is mouse [1] = pushed mouse btn
            elif keyormo.split('_')[0].strip() == 'm':
                possList = [mo.LEFT, mo.RIGHT, mo.MIDDLE]
                try:
                    possList.index(keyormo.split('_')[1].strip())
                except Exception as e:
                    continue

                value = mo.is_pressed(keyormo.split('_')[1].strip())

                if listKeyState[idx] != value:
                    generateKeyEvent(value, generateKeys, delay)
                    listKeyState[idx] = value


if __name__=="__main__":
    configFile = os.path.dirname(os.path.realpath(__file__)) + '\\' + 'config.cfg'
    config = configparser.ConfigParser()
    config.read(configFile)

    itemList = []
    for option in config.options('portion_key'):
        itemList.append({option:config['portion_key'][option]})

    drinkDelay = float(config['portion_drink_delay']['delay'])

    print("macro start drink delay  %s " % str(drinkDelay))

    while True:
        time.sleep(0.001)
        drinkPortionWithInput(itemList, drinkDelay)
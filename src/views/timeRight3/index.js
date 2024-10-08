import React, { memo, useEffect, useRef, useState } from 'react'
import * as echarts from 'echarts'
import { Button, Select } from 'antd'
import { getTimeStudentInfo, getTimeRadarInfo } from '../../api/index'
import { createFromIconfontCN } from '@ant-design/icons'
import { ActiveWrapper } from './style'
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_4565164_pp0ly9c3kg.js'
})

const TimeRight3 = (props) => {
  const { isChangeWeight } = props
  const radarRef = useRef(null)
  const specialRef = useRef(null)
  const specialRef2 = useRef(null)
  const specialRef3 = useRef(null)
  const timeTitleRef = useRef(null)
  const [specialPicMode, setSpecialPicMode] = useState(true)
  const [drawP3Data, setDrawP3Data] = useState(null)
  const [maxP3Data, setMaxP3Data] = useState(0)
  const symbolMargin = '10%'
  const symbolSize = 20

  // const spirit =
  //   'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHUAAACUCAYAAACtHGabAAAACXBIWXMAABcSAAAXEgFnn9JSAAAKTWlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVN3WJP3Fj7f92UPVkLY8LGXbIEAIiOsCMgQWaIQkgBhhBASQMWFiApWFBURnEhVxILVCkidiOKgKLhnQYqIWotVXDjuH9yntX167+3t+9f7vOec5/zOec8PgBESJpHmomoAOVKFPDrYH49PSMTJvYACFUjgBCAQ5svCZwXFAADwA3l4fnSwP/wBr28AAgBw1S4kEsfh/4O6UCZXACCRAOAiEucLAZBSAMguVMgUAMgYALBTs2QKAJQAAGx5fEIiAKoNAOz0ST4FANipk9wXANiiHKkIAI0BAJkoRyQCQLsAYFWBUiwCwMIAoKxAIi4EwK4BgFm2MkcCgL0FAHaOWJAPQGAAgJlCLMwAIDgCAEMeE80DIEwDoDDSv+CpX3CFuEgBAMDLlc2XS9IzFLiV0Bp38vDg4iHiwmyxQmEXKRBmCeQinJebIxNI5wNMzgwAABr50cH+OD+Q5+bk4eZm52zv9MWi/mvwbyI+IfHf/ryMAgQAEE7P79pf5eXWA3DHAbB1v2upWwDaVgBo3/ldM9sJoFoK0Hr5i3k4/EAenqFQyDwdHAoLC+0lYqG9MOOLPv8z4W/gi372/EAe/tt68ABxmkCZrcCjg/1xYW52rlKO58sEQjFu9+cj/seFf/2OKdHiNLFcLBWK8ViJuFAiTcd5uVKRRCHJleIS6X8y8R+W/QmTdw0ArIZPwE62B7XLbMB+7gECiw5Y0nYAQH7zLYwaC5EAEGc0Mnn3AACTv/mPQCsBAM2XpOMAALzoGFyolBdMxggAAESggSqwQQcMwRSswA6cwR28wBcCYQZEQAwkwDwQQgbkgBwKoRiWQRlUwDrYBLWwAxqgEZrhELTBMTgN5+ASXIHrcBcGYBiewhi8hgkEQcgIE2EhOogRYo7YIs4IF5mOBCJhSDSSgKQg6YgUUSLFyHKkAqlCapFdSCPyLXIUOY1cQPqQ28ggMor8irxHMZSBslED1AJ1QLmoHxqKxqBz0XQ0D12AlqJr0Rq0Hj2AtqKn0UvodXQAfYqOY4DRMQ5mjNlhXIyHRWCJWBomxxZj5Vg1Vo81Yx1YN3YVG8CeYe8IJAKLgBPsCF6EEMJsgpCQR1hMWEOoJewjtBK6CFcJg4Qxwicik6hPtCV6EvnEeGI6sZBYRqwm7iEeIZ4lXicOE1+TSCQOyZLkTgohJZAySQtJa0jbSC2kU6Q+0hBpnEwm65Btyd7kCLKArCCXkbeQD5BPkvvJw+S3FDrFiOJMCaIkUqSUEko1ZT/lBKWfMkKZoKpRzame1AiqiDqfWkltoHZQL1OHqRM0dZolzZsWQ8ukLaPV0JppZ2n3aC/pdLoJ3YMeRZfQl9Jr6Afp5+mD9HcMDYYNg8dIYigZaxl7GacYtxkvmUymBdOXmchUMNcyG5lnmA+Yb1VYKvYqfBWRyhKVOpVWlX6V56pUVXNVP9V5qgtUq1UPq15WfaZGVbNQ46kJ1Bar1akdVbupNq7OUndSj1DPUV+jvl/9gvpjDbKGhUaghkijVGO3xhmNIRbGMmXxWELWclYD6yxrmE1iW7L57Ex2Bfsbdi97TFNDc6pmrGaRZp3mcc0BDsax4PA52ZxKziHODc57LQMtPy2x1mqtZq1+rTfaetq+2mLtcu0W7eva73VwnUCdLJ31Om0693UJuja6UbqFutt1z+o+02PreekJ9cr1Dund0Uf1bfSj9Rfq79bv0R83MDQINpAZbDE4Y/DMkGPoa5hpuNHwhOGoEctoupHEaKPRSaMnuCbuh2fjNXgXPmasbxxirDTeZdxrPGFiaTLbpMSkxeS+Kc2Ua5pmutG003TMzMgs3KzYrMnsjjnVnGueYb7ZvNv8jYWlRZzFSos2i8eW2pZ8ywWWTZb3rJhWPlZ5VvVW16xJ1lzrLOtt1ldsUBtXmwybOpvLtqitm63Edptt3xTiFI8p0in1U27aMez87ArsmuwG7Tn2YfYl9m32zx3MHBId1jt0O3xydHXMdmxwvOuk4TTDqcSpw+lXZxtnoXOd8zUXpkuQyxKXdpcXU22niqdun3rLleUa7rrStdP1o5u7m9yt2W3U3cw9xX2r+00umxvJXcM970H08PdY4nHM452nm6fC85DnL152Xlle+70eT7OcJp7WMG3I28Rb4L3Le2A6Pj1l+s7pAz7GPgKfep+Hvqa+It89viN+1n6Zfgf8nvs7+sv9j/i/4XnyFvFOBWABwQHlAb2BGoGzA2sDHwSZBKUHNQWNBbsGLww+FUIMCQ1ZH3KTb8AX8hv5YzPcZyya0RXKCJ0VWhv6MMwmTB7WEY6GzwjfEH5vpvlM6cy2CIjgR2yIuB9pGZkX+X0UKSoyqi7qUbRTdHF09yzWrORZ+2e9jvGPqYy5O9tqtnJ2Z6xqbFJsY+ybuIC4qriBeIf4RfGXEnQTJAntieTE2MQ9ieNzAudsmjOc5JpUlnRjruXcorkX5unOy553PFk1WZB8OIWYEpeyP+WDIEJQLxhP5aduTR0T8oSbhU9FvqKNolGxt7hKPJLmnVaV9jjdO31D+miGT0Z1xjMJT1IreZEZkrkj801WRNberM/ZcdktOZSclJyjUg1plrQr1zC3KLdPZisrkw3keeZtyhuTh8r35CP5c/PbFWyFTNGjtFKuUA4WTC+oK3hbGFt4uEi9SFrUM99m/ur5IwuCFny9kLBQuLCz2Lh4WfHgIr9FuxYji1MXdy4xXVK6ZHhp8NJ9y2jLspb9UOJYUlXyannc8o5Sg9KlpUMrglc0lamUycturvRauWMVYZVkVe9ql9VbVn8qF5VfrHCsqK74sEa45uJXTl/VfPV5bdra3kq3yu3rSOuk626s91m/r0q9akHV0IbwDa0b8Y3lG19tSt50oXpq9Y7NtM3KzQM1YTXtW8y2rNvyoTaj9nqdf13LVv2tq7e+2Sba1r/dd3vzDoMdFTve75TsvLUreFdrvUV99W7S7oLdjxpiG7q/5n7duEd3T8Wej3ulewf2Re/ranRvbNyvv7+yCW1SNo0eSDpw5ZuAb9qb7Zp3tXBaKg7CQeXBJ9+mfHvjUOihzsPcw83fmX+39QjrSHkr0jq/dawto22gPaG97+iMo50dXh1Hvrf/fu8x42N1xzWPV56gnSg98fnkgpPjp2Snnp1OPz3Umdx590z8mWtdUV29Z0PPnj8XdO5Mt1/3yfPe549d8Lxw9CL3Ytslt0utPa49R35w/eFIr1tv62X3y+1XPK509E3rO9Hv03/6asDVc9f41y5dn3m978bsG7duJt0cuCW69fh29u0XdwruTNxdeo94r/y+2v3qB/oP6n+0/rFlwG3g+GDAYM/DWQ/vDgmHnv6U/9OH4dJHzEfVI0YjjY+dHx8bDRq98mTOk+GnsqcTz8p+Vv9563Or59/94vtLz1j82PAL+YvPv655qfNy76uprzrHI8cfvM55PfGm/K3O233vuO+638e9H5ko/ED+UPPR+mPHp9BP9z7nfP78L/eE8/sl0p8zAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAABvgSURBVHja7J17dBPXnce/dzR6WH7IwTbYxPgBBJsAtgwJXcchCM5ZEtJwcHqaRxs4hXQh+4dT3O1hd9ukJ05LT/dsT4lTyO7JSbfrQHabbdqNE/qgTjcR5KTOsxjCK4QGGwgy2ARJtoSec/ePGUkzo9HLGj2MdTk62PLM6KffZ76/+7u/e2eGUEoxHduota0BQA+ATgAm0Z9GAPQD6K22HBnGDGxkOkIdtbb1AHgqwWYOAN3VliN9Baj5D7QPwDdS2GXrTAM7raCOWts6Abw6hV3bqi1HhmYKVGaa2dub5f0KUDOsUguA+inuvlpIrApQ86xZ0tzfXIB647UC1Hxr77m0zSi0Gwcq2bvO/K5b25nmYQrZbx4BLQfQf8Ch16d5KGsBav60fgD1JzwsBl3aqR7jxWrLEXsBan6otAfA6tDv37eVTOUwDvA14kKfmgdALZDVd094WHR/XpoqUMtMK+znZZlQ6EeHIZ19Cbd7yrx49uYJlGni2j4CoHMmlQdDjc3jftQU648HnXrc7tJhfZkX95T6sLQogFptEBf9Gpg03BulDP3vmTg7k7dKJXvXdQN4Zqr7064BUhin5tl4NB2gAI4WSg/5lyilGzLtBaR5BFUYvrQWkNwgUIWw+1QBx42lVLUyVXMBaR5AVTnsmoSixYxuOR3SkL3rGsDPnphUPKwDgJl2DQwXlJq7sGtS+ZgmAEMzWbE5UyrZu64TU1sZmEp7DUD3TFNtTqAKtd0hTH0hWartEIBe2jXQX4Ca2eQoF0OYESHk993I6s06VCE5OpcH3/2QALifdg3YC1DTg9qH1C6byEZ7UYDbX4CaOlALgLfy2B83RHjONlQrRMtT8rxN2+Qqa1CngUrjqbdXUK+9AHX6qlSpOQS4vfkONytQs1RoKMAVWrbKhL030IjBJIyxh4WlNzNPqdO4L02lz91CuwasM0mpPbixWz2At8jedb1C+fPGVuoMUGleqjbTSu3GzGoh1fbckErNoxpvLosXnbnIkDOp1B7M7LYagFVYVDf9lZroWpgZ1hwALLRrYGi6K7WzAFQyrs2qYjMFtbvAMndgVYcqGF5YaZ9DsExBpVkH25fpIkUmoHYW2MVtreCvv50eUIXZmEKClMRwJ5MFCrWVuqXAK+n2VKYWnKs2ThX6iWsFVim1EfCXiNjzVamWAqOUWz0yUHlTE2ohQZpa26H2MKcANT9ab95BFTr8QtabXjasWvel1n2U8rY/vcPviXrvOKuDk+Tdzd561PKjKtkv2btuCDksDS4J+NDh82Ae58fSgA9L/T6YKJdwPwdhcFyrwwWGxQWNFu/oDPiz1pBLsGvUWDWRNtRcDGXKKIf1Xjfu9bpwh8+TFMBU2js6A/6gK8bv9UZc1GT1pnCHaNeAJR+gdiJLa3of8kziXq8L673urHn5OKvDy4ZSvFxUkq2Q3Zbu3KsaVpozrcqdLjs+HRvBHudYVoECwNKAD7smr+Kj8Qv4mXMMtcFApj+yOx+UakUGLqcooxweczux3e1QPbym2142lOBfi2/KVGh2AGhIp8qUl0p9yDOJj8YvYKfrWt4BBYCHPZN464vPsdNlz8ThTemO+Zk0Vdqg5vi0NhjAq3Yb9jjHcFPJrLweWJooh52ua/jo6gXFYVOaLXdQ1VTpQ8LZ3+HzgKmsg/HBXWAbl+cEGNEZk952XjCA/ms2tVW7MZ2J9LyA+sPJq9jjHIOJcjzQjd8D0RnBNqzICVRty93QNt2ZfAXnlnbsdF3Dq3YbytTrLjqnJdQyyuFVuw2PuZ28MSKgAKBtXgWmoi7rULmrIzCs3Z40WMZUDcPa7ejwedB/zYYlAZ8aZlhyBbU8HaD912zo8HkUgYZa0drtWYdKhWFTsmC5qyPQNt0JbfMqLA341AKbM6ir0wG6VPjiTGmlItAQbMOabVmFGrx0OvxzMmDDJ8GabWAbV8AkfL80wdYLiWhOhjRpASV6I4rWd8dNTrTNq1Lq49RuicBy4+dF224DU1mnFlhzVqFOdapo18TVMFAA0HdsSqrfTKWPEzd9xyNgSiunoNZTUZ8fK2JQn1uSORet3Q6iN8JEOexxjqWTPJnzXqk7XXY87JmMZI2NK1ICZVi7Hbrb7k8tk21aBeMDu1JOuKhCOVLbvComWLFamYq6sJ1LAz7scY5NG6gpJUl3+D3Y6YpM5jCllTCsTb2v1N9+PwxrtiU1liQ6I4iefxU/uCulEygogpQMWOpzSX7XtdwNzdzFAID1Xje2Cxl+NhLRdKAmfRaVCWFIGhY3pTTIlzvWuPF7CdXHVNZFKV3f8UhyH+Jzx/18OVilk8CwdhuInv+OuyavTqV/XZ1tqCmE3WuYJ5rdYBtXpF0tYirrUPzgrrjhWFMZfedZXcvdKLpnR8ITKjg+kvDEEoNVCtdMaSV0LXdH8onJqxn1s8c22OCxDXZnHGptMBAuLoSy3aTVkmQ4Ln5gFzRzFR6EHAMc27iCV3qcBIpOjCcVMUJguavKJ4HutvvDn9Ph8+AhUU6RZELakATMco9tsAf8PZQ7Mw51z8RYlFKmko0mUq1x4/dQdM8OybHZm5vj7xMngeKSgCoGS+PM8+o7NoV//kdXyotEGhIA3QL+Au+nIEyuZBRqaO2QWKVaUThSu7GNK1C8aTcMa7aBKa0EKa2Kr4IECVQqYHVxvhfbuDycNM0LBlJWawyYZo9tcAjAf0I6UzbECHG4IRNOfsztUC05SjWRKt60O+mIECuBohNjKZ1QibqJNNQqD7W9AI5AebGfnRHkfc5jG+zz2AbL1XJsGeUkY1KmtDKnVaFETSmBijWsmUrTzG2WqPWeKSzL8dgGLUK/uSPOZnZGiMcAf7fsYaHDTbs9fF0aYjIZdtUM3+IEiqq8Hkocor/mmZiKOt9C4odJDDGGmvZh0RsmAE95bIPDHttgZ1pQRUYTvRHa5lVxyjc0uVcWmjiBCme0KtnHNi4PnzDrve6kyodfq2tdCMCaQJ3iNhwrUaoH8KrHNtg/lf62NhiQ1Hd1LXdH96VTgZUlwERvRPEDPwTbsFx1+3S3fyVSZfMlXgazud7cixQWyhtq2sNQYz1MdiOAIY9tsFtJ5rEO3CFbs8M2rUoeSrJnfyYAy46pbVqlun1s4/JwlanDfz2hSWtmzy9O4RscEg9p7HE2NAF4xmMbtMoSqZj7LA14Jf0UU1Kh7ACJg8C/QKSv0PuUIuZy1nThxto/A/YRnTGcKXf4Ulyw5k+45nhIDHUoyTpkUn2tOPRqF92p8B1DX1JwDCFRvop+EZCwE2M4cCpgFfbJtH2hhGlpglpwnTGiIc4xCf9nF1OCOpykC0xCX9sb70Ke8BKVkkpJjZcKZzwJOYp/N2ECcnH4HM6cOImLI+dkDlRwXjzFJFCn3L6r42M4c/Ikzpw4kWSiRJOyj8yaF55siFfkry/moVK3B953joAxlST6VlYgcinjUIrn9w6PbdBCQJwUtEw+Po0akIdCD4QzPhTOFJVChHjG/7/v+efx3tuH+V8BLGy+FX//D99GkbGEdx4VHUM4UUjouOETJ4E6Fez79b59ePOPB4VjAbX19eh+4kkUGYsl9sVJt+Lap120Ct7x/4q7WL3VVA34A/C+fxxEy0JTHbeYcjQ0kmGmCBUAWldW1Oriht7mOyNhLORgpUSDRl403H9R/O5/f4P33z4s2ebsqZP43a9/E1E4RP1csgqN+l1q39EPP8BbBw8KQPi3L46M4PnduyX2UZHd0REgvn2hCBavX603lMHzzhCocxKauppE36wvPCwT0mB7nAyY76M/iY7Qt5RUxLyYk6moAzNrnuAwRH9RsUMER1BKQUTArQcPil0Sbm/98aDUeaGwJwebCHIYqNS+N0WfC1F3evb0KXw+MqwcejkqBZzAPqa0MuF88K1Xg6DOSYDVQDu/NhHUfglUcTyO1YK2cQQujEqlWl6tUA/TCsOBO6UOi1ImD5FSitA/yXuUwuN2S2CK85IzJ09KwdEkwEb9rGzfX0+dCn8uodLPd0+6wvZF+kzhG4Rs5xS6FwX7FIdMotY+zodmdsE8QBv3YqxD4iJS0lDZBbXwHzmN4Ghk5qLFFB0SiKEEoOBX1xNEweS/sAARsuFCjDEgUVBrRWVVRPhKjosXdpWAiuybVVkZ+7MV7KRi+wWaoTAdz754CwU6CJ8kkSJ9MiqVlHYZUSWiH/xldMpQqysBVgPfX06Bc/B13buqootNTJGJDy1lldEOE37mVSlyBCcKX1zk99p5dSBU6lQCYFZFJWZVVkSGHnLHxVOoJB9Ttu+W5sVRnxl61dbVSmwM2yyyhYTUm8A+prQSmjkLFP19JykHWA10K5clo1KrIlR5XI5qWhaamiogEIT3nSNhsC0mWQjW6qFdskaWPEQcRiD6khwncgbHv0Sd7fqNnYrh96uPPCJ0UxFVSBQR+iQFwDSk0jj23dv5FRQZjfzniU6qezZ2oqjIKMvsOGmfynGioVFi+yZMcxTdfS9TBe2yW5IZxkRNwDCxMihFrk0NAKsBAkH4jpwG/IEotb49PgJ2/u2SpEjssPCXk4csmUrBUSw1t+GbXY+HFVs7rw5/17UDy9qWR1QBCknAFY0XSbxhSxz7ZlVW4Fv/9F20mJeDEOCmigrc//DXsX7DRol9NKxWMWBIVZvAvmMKM0FlhMVtFgvYedWJgD4rVymfB8hCkzCb3hovCw4ImTApK8EbC4rw4Pu/kmxz/f6nopMisULlMOVhWR4lCRG6IiJKSUlkoK/wXsSNVCxIHipo3tj3pTf/HccclyXH3DSvFS+s/EoioCMAzMLIJa5SgQR339I2NYCp4FdPUOck1l2KHjwfHh9OyWGhzBFcrCREllQhOqGiMlUGvNdx6aP38PEv9+PM738Lj8PO93VEGnZzZV/oHTlQANiceKWlA0CnElBFqIaa9r5QtT9W069cBlLGx3pudBxfNt4s+fsx+6jEb8oDc1FJjxP3q5AmIUKfxf9J7jhxZKXhvizg9eLjl/fjszffgOPiCK6cPIpzb74R3ZfmyL6wn5yjivVepQRUBtRiqGmPWTCKNZ/aHfc80bIwdJjDYNd7SqX1KsdotOfCYV7mMPngnRMlSxwn6ns5IMpxkCpMaJ+9OQDXlSuRAEkpNHqDtNacQ/vCEe3KsNL8aaKpNXM8oDGhCjs9nRDs6hVgmxpwn0ypB2yno8Zt8moLhWxaCzG2lTiPd5xoAIgoOpRi7MSxyN8IMHtJKxatv08x9ObCvtBnHB6PfsDW5oY2xbougK2GmnaLbKVKSkqFoaa9J1HpMNTHzlm3ChtqImtsHX4vjjlGlepy0jM4/L/SeE+kEHHBIJRBywsBMWLq3LbbeaAgSZQOs2efw+/BAdsn0gSp3oz6IlMoxB4ShNVmqGk3C91iUi3Rul9LMmCVwsb+80dFJ7i0EEBlWWV00UBh1QCBgnIgmjER9fllkWWwprr6eAhzYh8AvC4DCgAvf3Zk+bs3dzCGmvZyQZU9iUJtylCF7MoC4MVEhfENNc2SSd19F4YUx4lSb5LoaTgiSmaIOIGR9ns0TtVo8f1fham2HrNvbUHFLU0KfiXRb2XRPv6kj2J1aKj7T1OZLUtZqTDUtNsNNe1bAKxJlBWL1er0e7H/wtHEsyREoXQnfkNxvlWxuhuOksVV1Vj28CYsuve+WGkuSLKrIjJg34jbjrdlF2BpOPo0VGpJX3ZhqGm3GmraLQDaADwrDH4l7fGFfyP5fdfpQ6lZk51VoLFcnjX75H5hKPad3fEna9ahijNjQ017t6GmvcFwcwdDg9xa6g+sRSCwtozRPdpoLB8IbXv+uiNKrRK/kOhxY7jiQoTKT2jyOlyJoYgU36L3JUnSoTEYZdq+8247XpL6xFHsU0+lQJp35rYCuLVulVUHQFOzklwqcxxyPnrzYRg1Z0Pb/OiTw9hc2yI4iIqKdwQAF3EEhXR1BES/y5alhH0tfp+QlIQZVUTMkn07jw/IVfrs6Z+eGPapCDXtq97GwK8VnQC/Iv/Pz50dZij2idX6ozNvi6REQMU10JAHCJE6SfIzJNtQSWGepBYyFQBE3susfYfHR3BgVJL1joy+MPo0bKLhhgq3SlfvUkabHRzDgGVZLL3s+Y54bvZHZw7j2MRlSYgMF7mVQljoxYgcxjDSArncqZAVzaO4UkWpUrl0M2Sfw+/B9iOvS4deAfroBMPgKiZgBLAkH5RqoZRWATACuIoJ6HU6GAjBb188Z2c5+gPxttuGDsjCFeE/nQjOYBgF1YW2Y8JnPREvHIISWJEEhTtpE8iGjlKZRqs4A/btOnMY5687xGH3B5f+bcQ6cQkoxSTG8in8zhZCcCkmKTfKIMiylDIMPfnj4z8jwOHQdh87L2PnyQGJFIjccQT82c8wojM/ohCeEZEpR2pPwOuRqZEK6pGGzqufnoHHYVdMctS2b/+Fo3jus/cjVTiKE5d2f/qDMYZB1fUr4dPNmi9QxYYYXaOgDAMty4LVaDDLFXiUAQlf/vbcuQ+w//NjUY4jjEhZktXwDAjDKM9JylfPg8B58Tw+fGFvBKy8jk546B+/vB+nXnsFH/38OXidjlAPKJsPVce+YxNXsPNEJDkyBYGjQxptRdvC8lk6HeyTE+H76lhUevBe2lAlIXjShoBXB71GQzUaDR3sPTWiC3Bbxds/dvS3OPzFeVnnxSuJMLwSiPACA1ACXmWEifRhiPRp4nVExbPn8NNu//MSAj7+eh7CMJK+9bP/ewOOC+fDww4eKv85kv5SBftGPA7c/ed9cPoj1xb1n9Zg8XVmUdCo2++4wsKISfq5iv2paolSJASDGq5cwSTLQsuyKNJoMPwvp19jOfxQvP2DH74iJE7ihIN3DBHFNAICogQztE84xPIZK2swYPaSVriuXMGHz+/B5RNHw6r1OOw43f9rXDkurcTpTSYhNBPh0CIlpmGfI+jFgx+8AocI6C/OMrA4eLv1FOvnr55jLleIeGmXVtRQvJUQcqvw82WAFM9vRbnGDb/fTxxeL/EHdKT1+4v+I0iwObRPGavHwB2b0VI6R1oojzXQlGWg4SW0gopCkvU4HRh68ecIeL3Kox0aqfrOXX475q/9W8miMMk6KkC2fjc5+0auO/DQB6/gmDOyqmGHjUHvOUZSIemuDz637cd/fHwJf3yaV1CFBIScAFAMQIcSol3WCKfbTbR+P1i/n7hICVn8zw1SsFo9fnLrOmye1yJxdswCghgsEA6LkRjMK8g1NoqPf7kPAZ8vZk13/tp1mLtipaQgL1nxCIU1u0nYd8x5GetkIfcbVwj6zmokQCmlWLA8iAs6bu2nO/5kbchHqGK1ugFyzbgQhnotdD4f0fl84AIBMhkgpPX7SyRgAeCJRXfhiaa7FGczpFUZEUwIC76IfDs+iw34vLj04Xu4fPxYuN/Ul5lQsbAJc1eshMFULi3QC+uNSHj6TSnTim/fgcufYNuR1xMCBaU4WgK0LQsABA7KPxh3OP+UCmCYEOICcDOACYCML2yDQeuBzucjQb8fPr+fGDkOi55o+YUc7KqKevxq5QMwaQ3RU1uyX4hcsTKgiFVCjLdKH9Ehl1KqXJZSsG/n8QHJsCUeUArgm7dw6KvkQknaUdo1YM5LqOIwzIMtIeNzboFhFg+2JBjEpN9PuGAQi7+79FtBhvxUvKtJq8cLbRtxX3WTAlOiXMtVWg4aryacLNio/lSZ6THHKLYdeV3SfwLAM+cYdNuYKKAA4GAJGtv8sLNC1s23Z2nXQHdeQu0jhGwBcEKsWONC1M4uwjWtB2wwSAKBAILBILntO82r3VrmN5A922ZDdRN+suxu1Ism3RUrRpLqeRJABfWRGImTTKZxa8gOvwe7Th/C3s/ek7xvCgK95xhsuaKRzRxQoTxM8GIVh60LgmKgoZYfT2WMFYYbRGDtALwoIZ6qBdBV+qAJBMAGg6SY49Cxtb6cM+r+cM6A2+XH6VrwJTzZvJoPyUrAaGQijcgBxpu1iXnpPlGuKYq2d/g92PPX97D3r+9KhisA0Oriw63ZJS1bUiq1b35bAOcMin5X5cHzGYEqD8VVfPKECYDoUANP1WzMrebwhc+HRW3zzYSQN60matqyMIgRvdQek1aPDTXNeHKxBfXGmyTdpiLMREDjwI2omEBeNHb4Pdhz9l1FmKEhS89FDcoDsWECwGuzOHQ2BeNZ9RrtGujMX6iCao1CcSIEFwBxowZN9y8r1xjYv4BE7uLVMy+I3hoODk30sTbUNGPD3CZsqjMrw0wFaALVhoLyAdsneP3SabwUvaYIAFDv5dVpcZKoMKvU1iwJwFqW0OdpheGMQ1WCCyEsl3/93rcopatlM5ywa4HemthwTVoD7qpswIa5zbirqoHvewlJz8BQEuP34PDYMF63ncaBS6fhiPEcN1MQ6L7EoOcCI02e4thxqIzCsiSpR3WmFYazBlXe3+Jr93aDYHfCxKuKQ99sDofinN11xnK0llejxVSNu6oaASDRpQsA+MtD7H4PDo+dw4jbjmP20RjrlWUwbQy6bdJQq3ieyFKwJFUaak/TroGeaQEVAPDIlxvA3zwk6Sc6Dusp+mdR9FVxOFqcms11xnLUF5fD4fMkhBar1XsJum0MtowxcWHGqjuloFJxa5xKUYJFbtoWOdAEN69Bg5eg28Y7dlhPYS2jsJr4/+XJlbydd9tx3p16JGt1EXReI+j8gkGri8S0lSD2yEucK0yh9Qi+yn+lPv7kPd++bZLsNruJxFlTbXYWGDJSDBVT2FmKISNgZynsGiRU9WohwSkPEJjdwv8uEkl8VGhJZLyqqjXrUIUb/YdDb3kAMLsJLA4GFifvUFMQN1RrXB7AsH7Kfn6Rdg1syXeoViR43orZRQTQ/P9qqDlX7elabqqhN1zvQIrPKM8qVLJ3XTeAZ6ayr8U5/dQ8oqcwtwRgTz9z2Uq7BvryLlESHsfcM9X9rWUU1rKgopotToJ6b/6pubuBUwMowF+kln9Qwd9LQrWH0g8V84lRn/CUkvIAYHHySrY4cx+yX5vFoX+Wao+ybkhJQNkIv0JydC6bTpUnYKud2YOsYtiNDKO6Bki+KbUn20qxs9EhW9wvZxJyZ1NQVaBQuMIwp1CFvvQb+dDHZQPy1oVBDBWrHv2s+VZR2oI8bbEgm92AxcGknGFvXRhEXxWntpmOVCPdjIYaH3IwnGGbXfwrlpodGqC7MWNALXlVUcpFgpTpZnYRlAd5JQPAsIGi/yZO7T4U4G+gsoV2DQylumOmlWrBDdZC/aU4bGdAnb1TnXbLBtQGFFpKMAWg9nQOlGmo5gKrpIYrvQD60oWZLai9Qgg2FdhFqbJfUOWQ2gfPeEVJGKd2Cy/TDFdkP4B+Ndb25hSqDHAngNDLNAPUaBVAWtW8ViavoMoAW4TQbEGC+dVp0o6Cn/y3Zhti3kCNA9ksZM2teQzwEPjn4w0BGMp0OJ22UOOALhdAm0U/m7IEDoLy7ALA4Vwq8IaAmkQCFhoylacxfAoBAwB7JrLRbLf/HwBxI17fueoAtgAAAABJRU5ErkJggg=='
  //const spirit =
  // 'image://data:image/png;base64,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'
  const spirit =
    'image://data:image/png;base64,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'

  const handleClick = () => {
    // console.log('点击切换')
    setSpecialPicMode(() => {
      // 变换数据格式
      return !specialPicMode
    })
  }
  const handleChange = (value) => {
    getTimeStudentInfo(value).then((res) => {
      setDrawP3Data(res)
      setMaxP3Data(Math.max(...res[0]['高峰型']))
    })
  }
  useEffect(() => {
    drawTimeTitle2()
    getTimeStudentInfo('提交次数').then((res) => {
      setDrawP3Data(res)
      setMaxP3Data(Math.max(...res[0]['高峰型']))
    })
    // 初始化系统时更新数据
    getTimeRadarInfo().then((res) => {
      drawRadar(res)
    })
  }, [isChangeWeight])

  useEffect(() => {
    if (drawP3Data != null) {
      //   console.log('象形柱图', drawP3Data)
      specialPicMode ? drawSpecialPicMode1() : drawSpecialPicMode2()
    }
  }, [drawP3Data, specialPicMode])

  const drawRadar = (res) => {
    const radarInstance = echarts.getInstanceByDom(radarRef.current)
    if (radarInstance) {
      radarInstance.dispose()
    }
    let myChart = echarts.init(radarRef.current)
    let option

    option = {
      title: {
        text: '群体等级对比雷达图',
        left: '30%',
        textStyle: {
          fontSize: 12,
          fontWeight: 'bold'
        }
      },
      legend: {
        orient: 'horizontal',
        x: 'left',
        left: '3%',
        top: '8%',
        itemWidth: 20,
        itemHeight: 10,
        width: '10px',
        data: name
      },
      tooltip: {
        trigger: 'item',
        show: 'true',
        formatter: (params) => {
          //   console.log('tooltip', params.data)
          let { value, name } = params.data
          return `${name}<br />掌握程度： ${value[0].toFixed(2)}<br />正确率：  &nbsp &nbsp${value[1].toFixed(2)}<br />活跃度：&nbsp  ${value[2].toFixed(2)}`
        }
      },
      radar: {
        // shape: 'circle',
        indicator: [
          { name: '掌握程度' },
          { name: '正确率' },
          { name: '活跃度' }
        ],
        axisName: {
          color: '#696969'
        },
        center: ['50%', '65%']
      },
      // color: ['#F3D475', '#F3B28A', '#F1928E'],
      color: ['#FAD891', '#6D9AC4', '#777B98'],
      series: [
        {
          name: 'Budget vs spending',
          type: 'radar',
          data: [
            {
              value: res['top'],
              name: 'A级'
            },
            {
              value: res['mid'],
              name: 'B级'
            },
            {
              value: res['low'],
              name: 'C级'
            }
          ]
        }
      ]
    }

    myChart.setOption(option)
  }

  const drawTimeTitle2 = () => {
    const opacity = 1
    const Instance = echarts.getInstanceByDom(timeTitleRef.current)
    if (Instance) {
      Instance.dispose()
    }
    let myChart = echarts.init(timeTitleRef.current)
    const rawData = [
      [
        291.6666666666667, 455.0, 322.0, 579.1666666666666, 3366.0, 336.0,
        1741.4, 341.27272727272725
      ],
      [
        692.3333333333334, 1035.4, 1357.0, 2321.5, 3202.0, 1272.0, 4404.6,
        1362.7272727272727
      ],
      [1272.0, 1994.2, 3318.0, 1830.0, 495.8, 2698.0, 988.0, 2652.181818181818],
      [
        2383.3333333333335, 2876.6, 1119.0, 658.3333333333334, 244.2, 1589.0,
        406.2, 1218.8181818181818
      ],
      [
        287.3333333333333, 247.0, 124.0, 79.75, 20.8, 131.0, 32.0,
        110.27272727272727
      ]
    ]

    // const rawDataT = rawData[0].map((_, colIndex) =>
    //   rawData.map((row) => row[colIndex])
    // )
    const knowledges = [
      'b3C9s',
      'g7R2j',
      'k4W1c',
      'm3D1v',
      'r8S3g',
      's8Y2f',
      't5V9e',
      'y9W5d'
    ]
    let option
    option = {
      title: {
        text: '知识点提交次数统计图',
        left: '9%',
        textStyle: {
          fontSize: 12,
          fontWeight: 'bold'
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // Use axis to trigger tooltip
          type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
        }
      },
      legend: {
        left: '40%',
        // top: '8%',
        itemWidth: 20,
        itemHeight: 10
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '12%',
        containLabel: true
      },
      yAxis: {
        type: 'value'
      },
      xAxis: {
        type: 'category',
        data: knowledges
      },
      // color: ['#f6bd60', '#ff7d00', '#bc4749', '#7f5539', '#669bbc'],
      color: ['#BEE4D7', '#8DD2E1', '#71B0D1', '#6B89BB', '#6168AC'],

      series: [
        {
          name: '9月',
          type: 'bar',
          stack: 'total',
          label: {
            show: false
          },
          emphasis: {
            focus: 'none'
          },
          itemStyle: {
            opacity: opacity
          },
          data: rawData[0].map((num) => Math.round(num))
        },
        {
          name: '10月',
          type: 'bar',
          stack: 'total',
          label: {
            show: false
          },
          emphasis: {
            focus: 'none'
          },
          itemStyle: {
            opacity: opacity
          },
          data: rawData[1].map((num) => Math.round(num))
        },
        {
          name: '11月',
          type: 'bar',
          stack: 'total',
          label: {
            show: false
          },
          emphasis: {
            focus: 'none'
          },
          itemStyle: {
            opacity: opacity
          },
          data: rawData[2].map((num) => Math.round(num))
        },
        {
          name: '12月',
          type: 'bar',
          stack: 'total',
          label: {
            show: false
          },
          emphasis: {
            focus: 'none'
          },
          itemStyle: {
            opacity: opacity
          },
          data: rawData[3].map((num) => Math.round(num))
        },
        {
          name: '1月',
          type: 'bar',
          stack: 'total',
          label: {
            show: false
          },
          itemStyle: {
            opacity: opacity
          },
          emphasis: {
            focus: 'none'
          },
          data: rawData[4].map((num) => Math.round(num))
        }
      ]
    }

    option && myChart.setOption(option)
  }

  //   const drawTimeTitle = () => {
  //     const Instance = echarts.getInstanceByDom(timeTitleRef.current)
  //     if (Instance) {
  //       Instance.dispose()
  //     }
  //     let myChart = echarts.init(timeTitleRef.current)
  //     let option

  //     const knowledges = [
  //       'b3C9s',
  //       'g7R2j',
  //       'k4W1c',
  //       'm3D1v',
  //       'r8S3g',
  //       's8Y2f',
  //       't5V9e',
  //       'y9W5d'
  //     ]

  //     const rawData = [
  //       [
  //         291.6666666666667, 455.0, 322.0, 579.1666666666666, 3366.0, 336.0,
  //         1741.4, 341.27272727272725
  //       ],
  //       [
  //         692.3333333333334, 1035.4, 1357.0, 2321.5, 3202.0, 1272.0, 4404.6,
  //         1362.7272727272727
  //       ],
  //       [1272.0, 1994.2, 3318.0, 1830.0, 495.8, 2698.0, 988.0, 2652.181818181818],
  //       [
  //         2383.3333333333335, 2876.6, 1119.0, 658.3333333333334, 244.2, 1589.0,
  //         406.2, 1218.8181818181818
  //       ],
  //       [
  //         287.3333333333333, 247.0, 124.0, 79.75, 20.8, 131.0, 32.0,
  //         110.27272727272727
  //       ]
  //     ]
  //     const totalData = []
  //     for (let i = 0; i < rawData[0].length; ++i) {
  //       let sum = 0
  //       for (let j = 0; j < rawData.length; ++j) {
  //         sum += rawData[j][i]
  //       }
  //       totalData.push(sum)
  //     }
  //     const grid = {
  //       left: 50,
  //       right: 20,
  //       top: 20,
  //       bottom: 30
  //     }
  //     const series = ['9', '10', '11', '12', '1'].map((name, sid) => {
  //       return {
  //         name,
  //         type: 'bar',
  //         stack: 'total',
  //         barWidth: '60%',
  //         label: {
  //           show: false,
  //           formatter: (params) => Math.round(params.value * 1000) / 10 + '%'
  //         },
  //         data: rawData[sid].map((d, did) =>
  //           totalData[did] <= 0 ? 0 : d / totalData[did]
  //         )
  //       }
  //     })
  //     option = {
  //       legend: {
  //         selectedMode: false,
  //         top: '-3px'
  //       },
  //       grid,
  //       yAxis: {
  //         type: 'value',
  //         max: 1
  //       },
  //       tooltip: {
  //         trigger: 'item',
  //         show: 'true',
  //         formatter: (params) => {
  //           //   console.log(
  //           //     'tooltip',
  //           //     params,
  //           //     params.seriesIndex,
  //           //     params.name,
  //           //     knowledges.indexOf(params.name),
  //           //     Math.round(
  //           //       rawData[params.seriesIndex][knowledges.indexOf(params.name)]
  //           //     )
  //           //   )
  //           return `${params.seriesName}月 ${params.name}<br />占比  ${(params.data * 100).toFixed(2)}%<br />作答次数 ${Math.round(
  //             rawData[params.seriesIndex][knowledges.indexOf(params.name)]
  //           )}`
  //         }
  //       },
  //       xAxis: {
  //         type: 'category',
  //         data: knowledges
  //       },
  //       series
  //     }

  //     option && myChart.setOption(option)
  //   }

  const drawSpecialPicMode1 = () => {
    drawSpecialPic1(drawP3Data[0]['高峰型'], maxP3Data)
    drawSpecialPic2(drawP3Data[0]['平均型'], maxP3Data)
    drawSpecialPic3(drawP3Data[0]['低峰型'], maxP3Data)
  }
  const drawSpecialPic1 = (drawData, maxData) => {
    // console.log('绘制象形柱图', drawData, maxData)
    const specialInstance = echarts.getInstanceByDom(specialRef.current)
    if (specialInstance) {
      specialInstance.dispose()
    }
    let myChart = echarts.init(specialRef.current)
    let option

    option = {
      title: {
        show: true,
        text: '高峰型',
        textStyle: {
          fontSize: 14,
          fontWeight: 'normal'
        },
        left: 'center',
        top: '-4px'
      },
      tooltip: {},
      xAxis: {
        show: false,
        max: maxData,
        splitLine: { show: false },
        offset: 10,
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          margin: 10
        }
      },
      yAxis: {
        show: true,
        data: ['A级', 'B级', 'C级'],
        inverse: true,
        axisTick: { show: false },
        axisLine: { show: false },
        axisLabel: {
          margin: 5,
          color: '#999',
          fontSize: 10
        }
      },
      grid: {
        top: '0%',
        height: 200,
        left: '12%',
        right: 20
      },
      series: [
        {
          // current data
          type: 'pictorialBar',
          symbol: spirit,
          symbolRepeat: 'fixed',
          symbolMargin: symbolMargin,
          symbolClip: true,
          symbolSize: symbolSize,
          symbolBoundingData: maxData,
          data: drawData, //[0.08, 0.012, 0.06],
          z: 10
        },
        {
          // full data
          type: 'pictorialBar',
          itemStyle: {
            opacity: 0.2
          },
          //   label: {
          //     show: true,
          //     formatter: function (params) {
          //       return ((params.value / maxData) * 100).toFixed(1) + ' %'
          //     },
          //     position: 'right',
          //     offset: [10, 0],
          //     color: 'green',
          //     fontSize: 18
          //   },
          animationDuration: 0,
          symbolRepeat: 'fixed',
          symbolMargin: symbolMargin,
          symbol: spirit,
          symbolSize: symbolSize,
          symbolBoundingData: maxData,
          data: drawData, // [0.08, 0.012, 0.06],
          z: 5
        }
      ]
    }

    option && myChart.setOption(option)
  }

  const drawSpecialPic2 = (drawData, maxData) => {
    const specialInstance = echarts.getInstanceByDom(specialRef2.current)
    if (specialInstance) {
      specialInstance.dispose()
    }
    let myChart = echarts.init(specialRef2.current)
    let option

    // var maxData = 2000
    option = {
      title: {
        show: true,
        text: '平均型',
        textStyle: {
          fontSize: 14,
          fontWeight: 'normal'
        },
        left: 'center',
        top: '-4px'
      },
      tooltip: {},
      xAxis: {
        show: false,
        max: maxData,
        splitLine: { show: false },
        offset: 10,
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          margin: 10
        }
      },
      yAxis: {
        show: false,
        data: ['A', 'B', 'C'],
        inverse: true,
        axisTick: { show: false },
        axisLine: { show: false },
        axisLabel: {
          margin: 5,
          color: '#999',
          fontSize: 10
        }
      },
      grid: {
        top: '0%',
        height: 200,
        left: 25,
        right: 20
      },
      series: [
        {
          // current data
          type: 'pictorialBar',
          symbol: spirit,
          symbolRepeat: 'fixed',
          symbolMargin: symbolMargin,
          symbolClip: true,
          symbolSize: symbolSize,
          symbolBoundingData: maxData,
          data: drawData, //[891, 1220, 660],
          z: 10
        },
        {
          // full data
          type: 'pictorialBar',
          itemStyle: {
            opacity: 0.2
          },
          //   label: {
          //     show: true,
          //     formatter: function (params) {
          //       return ((params.value / maxData) * 100).toFixed(1) + ' %'
          //     },
          //     position: 'right',
          //     offset: [10, 0],
          //     color: 'green',
          //     fontSize: 18
          //   },
          animationDuration: 0,
          symbolRepeat: 'fixed',
          symbolMargin: symbolMargin,
          symbol: spirit,
          symbolSize: symbolSize,
          symbolBoundingData: maxData,
          data: drawData, //[891, 1220, 660],
          z: 5
        }
      ]
    }

    option && myChart.setOption(option)
  }

  const drawSpecialPic3 = (drawData, maxData) => {
    const specialInstance = echarts.getInstanceByDom(specialRef3.current)
    if (specialInstance) {
      specialInstance.dispose()
    }
    let myChart = echarts.init(specialRef3.current)
    let option

    // var maxData = 2000
    option = {
      title: {
        show: true,
        text: '低峰型',
        textStyle: {
          fontSize: 14,
          fontWeight: 'normal'
        },
        left: 'center',
        top: '-4px'
      },
      tooltip: {},
      xAxis: {
        show: false,
        max: maxData,
        splitLine: { show: false },
        offset: 10,
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          margin: 10
        }
      },
      yAxis: {
        show: false,
        data: ['A级', 'B级', 'C级'],
        inverse: true,
        axisTick: { show: false },
        axisLine: { show: false },
        axisLabel: {
          margin: 5,
          color: '#999',
          fontSize: 10
        }
      },
      grid: {
        top: '0%',
        height: 200,
        left: 25,
        right: 20
      },
      series: [
        {
          // current data
          type: 'pictorialBar',
          symbol: spirit,
          symbolRepeat: 'fixed',
          symbolMargin: symbolMargin,
          symbolClip: true,
          symbolSize: symbolSize,
          symbolBoundingData: maxData,
          data: drawData, //[891, 1220, 660],
          z: 10
        },
        {
          // full data
          type: 'pictorialBar',
          itemStyle: {
            opacity: 0.2
          },
          //   label: {
          //     show: true,
          //     formatter: function (params) {
          //       return ((params.value / maxData) * 100).toFixed(1) + ' %'
          //     },
          //     position: 'right',
          //     offset: [10, 0],
          //     color: 'green',
          //     fontSize: 18
          //   },
          animationDuration: 0,
          symbolRepeat: 'fixed',
          symbolMargin: symbolMargin,
          symbol: spirit,
          symbolSize: symbolSize,
          symbolBoundingData: maxData,
          data: drawData, //[891, 1220, 660],
          z: 5
        }
      ]
    }

    option && myChart.setOption(option)
  }

  const drawSpecialPicMode2 = () => {
    drawSpecialPic1Mode2(drawP3Data[1]['top'], maxP3Data)
    drawSpecialPic2Mode2(drawP3Data[1]['mid'], maxP3Data)
    drawSpecialPic3Mode2(drawP3Data[1]['low'], maxP3Data)
  }

  const drawSpecialPic1Mode2 = (drawData, maxData) => {
    const specialInstance = echarts.getInstanceByDom(specialRef.current)
    if (specialInstance) {
      specialInstance.dispose()
    }
    let myChart = echarts.init(specialRef.current)
    let option

    // var maxData = 2000
    option = {
      title: {
        show: true,
        text: 'A级',
        textStyle: {
          fontSize: 14,
          fontWeight: 'normal'
        },
        left: 'center',
        top: '-4px'
      },
      tooltip: {},
      xAxis: {
        show: false,
        max: maxData,
        splitLine: { show: false },
        offset: 10,
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          margin: 10
        }
      },
      yAxis: {
        data: ['高\n峰\n型', '平\n均\n型', '低\n峰\n型'],
        inverse: true,
        axisTick: { show: false },
        axisLine: { show: false },
        axisLabel: {
          margin: 4,
          color: '#999',
          fontSize: 10
        }
      },
      grid: {
        top: '0%',
        height: 200,
        left: 25,
        right: 15
      },
      series: [
        {
          // current data
          type: 'pictorialBar',
          symbol: spirit,
          symbolRepeat: 'fixed',
          symbolMargin: symbolMargin,
          symbolClip: true,
          symbolSize: symbolSize,
          symbolBoundingData: maxData,
          data: drawData, //[891, 1220, 660],
          z: 10
        },
        {
          // full data
          type: 'pictorialBar',
          itemStyle: {
            opacity: 0.2
          },
          //   label: {
          //     show: true,
          //     formatter: function (params) {
          //       return ((params.value / maxData) * 100).toFixed(1) + ' %'
          //     },
          //     position: 'right',
          //     offset: [10, 0],
          //     color: 'green',
          //     fontSize: 18
          //   },
          animationDuration: 0,
          symbolRepeat: 'fixed',
          symbolMargin: symbolMargin,
          symbol: spirit,
          symbolSize: symbolSize,
          symbolBoundingData: maxData,
          data: drawData, //[891, 1220, 660],
          z: 5
        }
      ]
    }

    option && myChart.setOption(option)
  }

  const drawSpecialPic2Mode2 = (drawData, maxData) => {
    const specialInstance = echarts.getInstanceByDom(specialRef2.current)
    if (specialInstance) {
      specialInstance.dispose()
    }
    let myChart = echarts.init(specialRef2.current)
    let option

    // var maxData = 2000
    option = {
      title: {
        show: true,
        text: 'B级',
        textStyle: {
          fontSize: 14,
          fontWeight: 'normal'
        },
        left: 'center',
        top: '-4px'
      },
      tooltip: {},
      xAxis: {
        show: false,
        max: maxData,
        splitLine: { show: false },
        offset: 10,
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          margin: 10
        }
      },
      yAxis: {
        show: false,
        data: ['A级', 'B级', 'C级'],
        inverse: true,
        axisTick: { show: false },
        axisLine: { show: false },
        axisLabel: {
          margin: 5,
          color: '#999',
          fontSize: 10
        }
      },
      grid: {
        top: '0%',
        height: 200,
        left: 25,
        right: 20
      },
      series: [
        {
          // current data
          type: 'pictorialBar',
          symbol: spirit,
          symbolRepeat: 'fixed',
          symbolMargin: symbolMargin,
          symbolClip: true,
          symbolSize: symbolSize,
          symbolBoundingData: maxData,
          data: drawData, //[891, 1220, 660],
          z: 10
        },
        {
          // full data
          type: 'pictorialBar',
          itemStyle: {
            opacity: 0.2
          },
          //   label: {
          //     show: true,
          //     formatter: function (params) {
          //       return ((params.value / maxData) * 100).toFixed(1) + ' %'
          //     },
          //     position: 'right',
          //     offset: [10, 0],
          //     color: 'green',
          //     fontSize: 18
          //   },
          animationDuration: 0,
          symbolRepeat: 'fixed',
          symbolMargin: symbolMargin,
          symbol: spirit,
          symbolSize: symbolSize,
          symbolBoundingData: maxData,
          data: drawData, //[891, 1220, 660],
          z: 5
        }
      ]
    }
    option && myChart.setOption(option)
  }

  const drawSpecialPic3Mode2 = (drawData, maxData) => {
    const specialInstance = echarts.getInstanceByDom(specialRef3.current)
    if (specialInstance) {
      specialInstance.dispose()
    }
    let myChart = echarts.init(specialRef3.current)
    let option

    // var maxData = 2000
    option = {
      title: {
        show: true,
        text: 'C级',
        textStyle: {
          fontSize: 14,
          fontWeight: 'normal'
        },
        left: 'center',
        top: '-4px'
      },
      tooltip: {},
      xAxis: {
        show: false,
        max: maxData,
        splitLine: { show: false },
        offset: 10,
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          margin: 10
        }
      },
      yAxis: {
        show: false,
        data: ['A级', 'B级', 'C级'],
        inverse: true,
        axisTick: { show: false },
        axisLine: { show: false },
        axisLabel: {
          margin: 5,
          color: '#999',
          fontSize: 10
        }
      },
      grid: {
        top: '0%',
        height: 200,
        left: 25,
        right: 20
      },
      series: [
        {
          // current data
          type: 'pictorialBar',
          symbol: spirit,
          symbolRepeat: 'fixed',
          symbolMargin: symbolMargin,
          symbolClip: true,
          symbolSize: symbolSize,
          symbolBoundingData: maxData,
          data: drawData, //[891, 1220, 660],
          z: 10
        },
        {
          // full data
          type: 'pictorialBar',
          itemStyle: {
            opacity: 0.2
          },
          //   label: {
          //     show: true,
          //     formatter: function (params) {
          //       return ((params.value / maxData) * 100).toFixed(1) + ' %'
          //     },
          //     position: 'right',
          //     offset: [10, 0],
          //     color: 'green',
          //     fontSize: 18
          //   },
          animationDuration: 0,
          symbolRepeat: 'fixed',
          symbolMargin: symbolMargin,
          symbol: spirit,
          symbolSize: symbolSize,
          symbolBoundingData: maxData,
          data: drawData, //[891, 1220, 660],
          z: 5
        }
      ]
    }
    option && myChart.setOption(option)
  }

  return (
    <ActiveWrapper>
      <div className="containerGroup">
        <div className="atitle">
          <div className="title-icon">
            <IconFont type="icon-huoyuedu" />
          </div>
          群体活跃特征统计图
        </div>
        <div className="active-content">
          <div className="active-top">
            <div id="timeRadar" ref={radarRef} className="active-radar"></div>
            <div ref={timeTitleRef} className="active-title"></div>
          </div>
          <div className="active-bottom">
            <div className="active-btn">
              <span className="topic" style={{ fontWeight: 'bold' }}>
                群体特征对比人物图
              </span>

              <Button
                onClick={handleClick}
                size={'small'}
                style={{ marginLeft: 8 }}
              >
                切换
              </Button>
              <Select
                defaultValue="提交次数"
                style={{ width: 100, marginLeft: 8 }}
                onChange={handleChange}
                options={[
                  {
                    label: <span>特征</span>,
                    title: '特征',
                    options: [
                      {
                        label: <span>提交次数</span>,
                        value: '提交次数'
                      },
                      {
                        label: <span>活跃天数</span>,
                        value: '活跃天数'
                      },
                      {
                        label: <span>题目数</span>,
                        value: '题目数'
                      }
                    ]
                  }
                ]}
                size={'small'}
              />
            </div>
            <div className="active-children">
              <div ref={specialRef} className="special1"></div>
              <div ref={specialRef2} className="special2"></div>
              <div ref={specialRef3} className="special3"></div>
            </div>
          </div>
        </div>
      </div>
      {/* <div
        className="containerGroup"
        style={{
          height: '100%',
          width: '100%'
        }}
      >
        <div className="atitle">
          <div
            style={{
              fontSize: '23px',
              marginLeft: '4px',
              marginRight: '4px'
            }}
          >
            <IconFont type="icon-huoyuedu" />
          </div>
          群体活跃特征
        </div>
        <div
          style={{
            height: 'calc(100% - 34px)',
            width: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div
            style={{
              //   height: '50%',
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              flex: 8
            }}
          >
            <div id="timeRadar" ref={radarRef} style={{ flex: 3 }}></div>
            <div ref={timeTitleRef} style={{ flex: 7 }}></div>
          </div>

          <div style={{ flex: 1 }}>
            <Button
              style={{
                width: 60,
                height: 30,
                marginLeft: 6,
                position: 'absolute',
                left: 120,
                top: 260,
                zIndex: 100,
                textAlign: 'center'
              }}
              onClick={handleClick}
            >
              切换
            </Button>
            <Select
              defaultValue="提交次数"
              style={{
                width: 100,
                position: 'absolute',
                height: 30,
                left: 10,
                top: 260,
                zIndex: 100
              }}
              onChange={handleChange}
              options={[
                {
                  label: <span>特征</span>,
                  title: '特征',
                  options: [
                    {
                      label: <span>提交次数</span>,
                      value: '提交次数'
                    },
                    {
                      label: <span>活跃天数</span>,
                      value: '活跃天数'
                    },
                    {
                      label: <span>题目数</span>,
                      value: '题目数'
                    }
                  ]
                }
              ]}
            />
          </div>
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              flex: 7
            }}
          >
            <div ref={specialRef} style={{ flex: 1 }}></div>
            <div ref={specialRef2} style={{ flex: 1 }}></div>
            <div ref={specialRef3} style={{ flex: 1 }}></div>
          </div>
        </div>
      </div> */}
    </ActiveWrapper>
  )
}

export default memo(TimeRight3)

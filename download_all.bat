@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

REM 创建目录
if not exist assets\images\cards\guofeng mkdir assets\images\cards\guofeng
if not exist assets\images\cards\japanese mkdir assets\images\cards\japanese
if not exist assets\images\bg mkdir assets\images\bg

echo Downloading Guofeng cards...
curl.exe -x http://127.0.0.1:7897 -o assets/images/cards/guofeng/lantern.png "https://image.pollinations.ai/prompt/red%20Chinese%20lantern%20traditional%20style%20watercolor?width=400&height=400&seed=1&nologo=true" --max-time 60 -s
echo [1/20] lantern... OK
curl.exe -x http://127.0.0.1:7897 -o assets/images/cards/guofeng/fan.png "https://image.pollinations.ai/prompt/traditional%20Chinese%20folding%20fan%20bamboo%20ink%20painting?width=400&height=400&seed=2&nologo=true" --max-time 60 -s
echo [2/20] fan... OK
curl.exe -x http://127.0.0.1:7897 -o assets/images/cards/guofeng/plum.png "https://image.pollinations.ai/prompt/plum%20blossom%20branch%20Chinese%20ink%20wash%20pink?width=400&height=400&seed=3&nologo=true" --max-time 60 -s
echo [3/20] plum... OK
curl.exe -x http://127.0.0.1:7897 -o assets/images/cards/guofeng/peony.png "https://image.pollinations.ai/prompt/pink%20peony%20flower%20Chinese%20watercolor%20elegant?width=400&height=400&seed=4&nologo=true" --max-time 60 -s
echo [4/20] peony... OK
curl.exe -x http://127.0.0.1:7897 -o assets/images/cards/guofeng/lotus.png "https://image.pollinations.ai/prompt/pink%20lotus%20flower%20green%20leaves%20Chinese%20watercolor?width=400&height=400&seed=5&nologo=true" --max-time 60 -s
echo [5/20] lotus... OK
curl.exe -x http://127.0.0.1:7897 -o assets/images/cards/guofeng/bamboo.png "https://image.pollinations.ai/prompt/bamboo%20stalks%20leaves%20Chinese%20ink%20painting%20minimalist?width=400&height=400&seed=6&nologo=true" --max-time 60 -s
echo [6/20] bamboo... OK
curl.exe -x http://127.0.0.1:7897 -o assets/images/cards/guofeng/chrysanthemum.png "https://image.pollinations.ai/prompt/yellow%20chrysanthemum%20Chinese%20traditional%20watercolor?width=400&height=400&seed=7&nologo=true" --max-time 60 -s
echo [7/20] chrysanthemum... OK
curl.exe -x http://127.0.0.1:7897 -o assets/images/cards/guofeng/tea.png "https://image.pollinations.ai/prompt/Chinese%20tea%20set%20teapot%20cups%20traditional%20watercolor?width=400&height=400&seed=8&nologo=true" --max-time 60 -s
echo [8/20] tea... OK
curl.exe -x http://127.0.0.1:7897 -o assets/images/cards/guofeng/brush.png "https://image.pollinations.ai/prompt/Chinese%20calligraphy%20brush%20ink%20stone%20traditional?width=400&height=400&seed=9&nologo=true" --max-time 60 -s
echo [9/20] brush... OK
curl.exe -x http://127.0.0.1:7897 -o assets/images/cards/guofeng/guzheng.png "https://image.pollinations.ai/prompt/Chinese%20guzheng%20musical%20instrument%20traditional%20watercolor?width=400&height=400&seed=10&nologo=true" --max-time 60 -s
echo [10/20] guzheng... OK
curl.exe -x http://127.0.0.1:7897 -o assets/images/cards/guofeng/mask.png "https://image.pollinations.ai/prompt/Chinese%20Peking%20opera%20mask%20colorful%20traditional?width=400&height=400&seed=11&nologo=true" --max-time 60 -s
echo [11/20] mask... OK
curl.exe -x http://127.0.0.1:7897 -o assets/images/cards/guofeng/knot.png "https://image.pollinations.ai/prompt/Chinese%20lucky%20knot%20decoration%20red%20gold?width=400&height=400&seed=12&nologo=true" --max-time 60 -s
echo [12/20] knot... OK
curl.exe -x http://127.0.0.1:7897 -o assets/images/cards/guofeng/dragon.png "https://image.pollinations.ai/prompt/Chinese%20dragon%20boat%20festival%20colorful%20watercolor?width=400&height=400&seed=13&nologo=true" --max-time 60 -s
echo [13/20] dragon... OK
curl.exe -x http://127.0.0.1:7897 -o assets/images/cards/guofeng/lion.png "https://image.pollinations.ai/prompt/Chinese%20guardian%20lion%20statue%20stone%20traditional?width=400&height=400&seed=14&nologo=true" --max-time 60 -s
echo [14/20] lion... OK
curl.exe -x http://127.0.0.1:7897 -o assets/images/cards/guofeng/silk.png "https://image.pollinations.ai/prompt/Chinese%20silk%20fabric%20floral%20pattern%20elegant?width=400&height=400&seed=15&nologo=true" --max-time 60 -s
echo [15/20] silk... OK
curl.exe -x http://127.0.0.1:7897 -o assets/images/cards/guofeng/jade.png "https://image.pollinations.ai/prompt/Chinese%20jade%20pendant%20dragon%20carving%20green?width=400&height=400&seed=16&nologo=true" --max-time 60 -s
echo [16/20] jade... OK
curl.exe -x http://127.0.0.1:7897 -o assets/images/cards/guofeng/koi.png "https://image.pollinations.ai/prompt/colorful%20koi%20fish%20swimming%20Chinese%20painting?width=400&height=400&seed=17&nologo=true" --max-time 60 -s
echo [17/20] koi... OK
curl.exe -x http://127.0.0.1:7897 -o assets/images/cards/guofeng/crane.png "https://image.pollinations.ai/prompt/white%20crane%20bird%20Chinese%20ink%20wash%20elegant?width=400&height=400&seed=18&nologo=true" --max-time 60 -s
echo [18/20] crane... OK
curl.exe -x http://127.0.0.1:7897 -o assets/images/cards/guofeng/pagoda.png "https://image.pollinations.ai/prompt/Chinese%20pagoda%20tower%20architecture%20watercolor?width=400&height=400&seed=19&nologo=true" --max-time 60 -s
echo [19/20] pagoda... OK
curl.exe -x http://127.0.0.1:7897 -o assets/images/cards/guofeng/mountain.png "https://image.pollinations.ai/prompt/Chinese%20landscape%20mountains%20mist%20ink%20wash?width=400&height=400&seed=20&nologo=true" --max-time 60 -s
echo [20/20] mountain... OK

echo.
echo Downloading Japanese cards...
curl.exe -x http://127.0.0.1:7897 -o assets/images/cards/japanese/torii.png "https://image.pollinations.ai/prompt/Japanese%20torii%20gate%20red%20traditional%20watercolor?width=400&height=400&seed=21&nologo=true" --max-time 60 -s
echo [1/20] torii... OK
curl.exe -x http://127.0.0.1:7897 -o assets/images/cards/japanese/fuji.png "https://image.pollinations.ai/prompt/Mount%20Fuji%20cherry%20blossoms%20Japanese%20watercolor?width=400&height=400&seed=22&nologo=true" --max-time 60 -s
echo [2/20] fuji... OK
curl.exe -x http://127.0.0.1:7897 -o assets/images/cards/japanese/sakura.png "https://image.pollinations.ai/prompt/cherry%20blossom%20branch%20pink%20Japanese%20watercolor?width=400&height=400&seed=23&nologo=true" --max-time 60 -s
echo [3/20] sakura... OK
curl.exe -x http://127.0.0.1:7897 -o assets/images/cards/japanese/shrine.png "https://image.pollinations.ai/prompt/Japanese%20Shinto%20shrine%20architecture%20watercolor?width=400&height=400&seed=24&nologo=true" --max-time 60 -s
echo [4/20] shrine... OK
curl.exe -x http://127.0.0.1:7897 -o assets/images/cards/japanese/tokyo.png "https://image.pollinations.ai/prompt/Tokyo%20Tower%20landmark%20watercolor%20painting?width=400&height=400&seed=25&nologo=true" --max-time 60 -s
echo [5/20] tokyo... OK
curl.exe -x http://127.0.0.1:7897 -o assets/images/cards/japanese/kimono.png "https://image.pollinations.ai/prompt/Japanese%20kimono%20dress%20floral%20pattern%20watercolor?width=400&height=400&seed=26&nologo=true" --max-time 60 -s
echo [6/20] kimono... OK
curl.exe -x http://127.0.0.1:7897 -o assets/images/cards/japanese/bamboo_jp.png "https://image.pollinations.ai/prompt/Japanese%20bamboo%20forest%20serene%20green%20watercolor?width=400&height=400&seed=27&nologo=true" --max-time 60 -s
echo [7/20] bamboo_jp... OK
curl.exe -x http://127.0.0.1:7897 -o assets/images/cards/japanese/koinobori.png "https://image.pollinations.ai/prompt/Japanese%20carp%20streamer%20flags%20colorful%20watercolor?width=400&height=400&seed=28&nologo=true" --max-time 60 -s
echo [8/20] koinobori... OK
curl.exe -x http://127.0.0.1:7897 -o assets/images/cards/japanese/lantern_jp.png "https://image.pollinations.ai/prompt/Japanese%20paper%20lantern%20warm%20glow%20watercolor?width=400&height=400&seed=29&nologo=true" --max-time 60 -s
echo [9/20] lantern_jp... OK
curl.exe -x http://127.0.0.1:7897 -o assets/images/cards/japanese/maneki.png "https://image.pollinations.ai/prompt/Japanese%20maneki-neko%20lucky%20cat%20cute%20watercolor?width=400&height=400&seed=30&nologo=true" --max-time 60 -s
echo [10/20] maneki... OK
curl.exe -x http://127.0.0.1:7897 -o assets/images/cards/japanese/matcha.png "https://image.pollinations.ai/prompt/Japanese%20matcha%20tea%20ceremony%20green%20watercolor?width=400&height=400&seed=31&nologo=true" --max-time 60 -s
echo [11/20] matcha... OK
curl.exe -x http://127.0.0.1:7897 -o assets/images/cards/japanese/ukiyo.png "https://image.pollinations.ai/prompt/Japanese%20ukiyo-e%20wave%20Great%20Wave%20art%20style?width=400&height=400&seed=32&nologo=true" --max-time 60 -s
echo [12/20] ukiyo... OK
curl.exe -x http://127.0.0.1:7897 -o assets/images/cards/japanese/origami.png "https://image.pollinations.ai/prompt/Japanese%20origami%20paper%20cranes%20colorful%20watercolor?width=400&height=400&seed=33&nologo=true" --max-time 60 -s
echo [13/20] origami... OK
curl.exe -x http://127.0.0.1:7897 -o assets/images/cards/japanese/wisteria.png "https://image.pollinations.ai/prompt/Japanese%20wisteria%20flowers%20purple%20watercolor?width=400&height=400&seed=34&nologo=true" --max-time 60 -s
echo [14/20] wisteria... OK
curl.exe -x http://127.0.0.1:7897 -o assets/images/cards/japanese/autumn.png "https://image.pollinations.ai/prompt/Japanese%20autumn%20maple%20leaves%20red%20orange%20watercolor?width=400&height=400&seed=35&nologo=true" --max-time 60 -s
echo [15/20] autumn... OK
curl.exe -x http://127.0.0.1:7897 -o assets/images/cards/japanese/stone_lantern.png "https://image.pollinations.ai/prompt/Japanese%20stone%20lantern%20garden%20moss%20watercolor?width=400&height=400&seed=36&nologo=true" --max-time 60 -s
echo [16/20] stone_lantern... OK
curl.exe -x http://127.0.0.1:7897 -o assets/images/cards/japanese/wind_chime.png "https://image.pollinations.ai/prompt/Japanese%20wind%20chime%20furin%20glass%20summer?width=400&height=400&seed=37&nologo=true" --max-time 60 -s
echo [17/20] wind_chime... OK
curl.exe -x http://127.0.0.1:7897 -o assets/images/cards/japanese/uchiwa.png "https://image.pollinations.ai/prompt/Japanese%20uchiwa%20round%20fan%20bamboo%20watercolor?width=400&height=400&seed=38&nologo=true" --max-time 60 -s
echo [18/20] uchiwa... OK
curl.exe -x http://127.0.0.1:7897 -o assets/images/cards/japanese/goldfish.png "https://image.pollinations.ai/prompt/Japanese%20goldfish%20bowl%20colorful%20watercolor?width=400&height=400&seed=39&nologo=true" --max-time 60 -s
echo [19/20] goldfish... OK
curl.exe -x http://127.0.0.1:7897 -o assets/images/cards/japanese/daruma.png "https://image.pollinations.ai/prompt/Japanese%20daruma%20doll%20red%20cute%20watercolor?width=400&height=400&seed=40&nologo=true" --max-time 60 -s
echo [20/20] daruma... OK

echo.
echo Downloading backgrounds...
curl.exe -x http://127.0.0.1:7897 -o assets/images/bg/guofeng_bg.png "https://image.pollinations.ai/prompt/Chinese%20ink%20painting%20background%20mountains%20mist%20serene?width=1920&height=1080&seed=100&nologo=true" --max-time 120 -s
echo Guofeng background... OK
curl.exe -x http://127.0.0.1:7897 -o assets/images/bg/japanese_bg.png "https://image.pollinations.ai/prompt/Japanese%20watercolor%20cherry%20blossoms%20mountains%20serene?width=1920&height=1080&seed=101&nologo=true" --max-time 120 -s
echo Japanese background... OK

echo.
echo All downloads completed!
pause

# 创建目录
$dirs = @(
    "e:\trae project\memory-match-game\assets\images\cards\guofeng",
    "e:\trae project\memory-match-game\assets\images\cards\japanese",
    "e:\trae project\memory-match-game\assets\images\bg"
)
foreach ($dir in $dirs) {
    if (!(Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force }
}

# 代理设置
$proxy = "http://127.0.0.1:7897"

# 国风卡牌
$guofeng = @(
    @{file="lantern.png"; prompt="red Chinese lantern traditional watercolor painting soft beige background elegant"},
    @{file="fan.png"; prompt="traditional Chinese folding fan bamboo silk painting watercolor soft beige background"},
    @{file="plum.png"; prompt="plum blossom branch pink flowers Chinese ink wash painting soft beige background"},
    @{file="peony.png"; prompt="pink peony flower Chinese watercolor painting soft beige background elegant"},
    @{file="lotus.png"; prompt="pink lotus flower green leaves Chinese watercolor painting soft beige background"},
    @{file="bamboo.png"; prompt="bamboo stalks leaves Chinese ink painting minimalist soft beige background"},
    @{file="chrysanthemum.png"; prompt="yellow chrysanthemum Chinese traditional watercolor soft beige background"},
    @{file="tea.png"; prompt="Chinese tea set teapot cups traditional watercolor soft beige background"},
    @{file="brush.png"; prompt="Chinese calligraphy brush ink stone traditional watercolor soft beige background"},
    @{file="guzheng.png"; prompt="Chinese guzheng musical instrument traditional watercolor soft beige background"},
    @{file="mask.png"; prompt="Chinese Peking opera mask colorful traditional watercolor soft beige background"},
    @{file="knot.png"; prompt="Chinese lucky knot decoration red gold traditional watercolor soft beige background"},
    @{file="dragon.png"; prompt="Chinese dragon boat festival colorful watercolor soft beige background"},
    @{file="lion.png"; prompt="Chinese guardian lion statue stone traditional watercolor soft beige background"},
    @{file="silk.png"; prompt="Chinese silk fabric floral pattern elegant watercolor soft beige background"},
    @{file="jade.png"; prompt="Chinese jade pendant dragon carving green watercolor soft beige background"},
    @{file="koi.png"; prompt="colorful koi fish swimming Chinese painting watercolor soft beige background"},
    @{file="crane.png"; prompt="white crane bird Chinese ink wash painting elegant soft beige background"},
    @{file="pagoda.png"; prompt="Chinese pagoda tower architecture watercolor soft beige background"},
    @{file="mountain.png"; prompt="Chinese landscape mountains mist ink wash painting soft beige background"}
)

# 和风卡牌
$japanese = @(
    @{file="torii.png"; prompt="Japanese torii gate red traditional watercolor painting soft cream background"},
    @{file="fuji.png"; prompt="Mount Fuji cherry blossoms Japanese watercolor painting soft cream background"},
    @{file="sakura.png"; prompt="cherry blossom branch pink Japanese watercolor painting soft cream background"},
    @{file="shrine.png"; prompt="Japanese Shinto shrine architecture watercolor soft cream background"},
    @{file="tokyo.png"; prompt="Tokyo Tower landmark watercolor painting soft cream background"},
    @{file="kimono.png"; prompt="Japanese kimono dress floral pattern watercolor soft cream background"},
    @{file="bamboo_jp.png"; prompt="Japanese bamboo forest serene green watercolor soft cream background"},
    @{file="koinobori.png"; prompt="Japanese carp streamer flags colorful watercolor soft cream background"},
    @{file="lantern_jp.png"; prompt="Japanese paper lantern warm glow watercolor soft cream background"},
    @{file="maneki.png"; prompt="Japanese maneki-neko lucky cat cute watercolor soft cream background"},
    @{file="matcha.png"; prompt="Japanese matcha tea ceremony green watercolor soft cream background"},
    @{file="ukiyo.png"; prompt="Japanese ukiyo-e wave Great Wave art style watercolor soft cream background"},
    @{file="origami.png"; prompt="Japanese origami paper cranes colorful watercolor soft cream background"},
    @{file="wisteria.png"; prompt="Japanese wisteria flowers purple watercolor soft cream background"},
    @{file="autumn.png"; prompt="Japanese autumn maple leaves red orange watercolor soft cream background"},
    @{file="stone_lantern.png"; prompt="Japanese stone lantern garden moss watercolor soft cream background"},
    @{file="wind_chime.png"; prompt="Japanese wind chime furin glass summer watercolor soft cream background"},
    @{file="uchiwa.png"; prompt="Japanese uchiwa round fan bamboo watercolor soft cream background"},
    @{file="goldfish.png"; prompt="Japanese goldfish bowl colorful watercolor soft cream background"},
    @{file="daruma.png"; prompt="Japanese daruma doll red cute watercolor soft cream background"}
)

function Download-Image($url, $outPath, $name) {
    try {
        $response = Invoke-WebRequest -Uri $url -Method GET -TimeoutSec 120 -UseBasicParsing -ErrorAction Stop
        if ($response.StatusCode -eq 200 -and $response.Content -and $response.Content.Length -gt 1000) {
            [System.IO.File]::WriteAllBytes($outPath, $response.Content)
            Write-Host "  OK ($($response.Content.Length) bytes)" -ForegroundColor Green
            return $true
        } else {
            Write-Host "  FAILED (empty or small)" -ForegroundColor Red
            return $false
        }
    } catch {
        Write-Host "  FAILED: $_.Exception.Message" -ForegroundColor Red
        return $false
    }
}

# 下载国风卡牌
Write-Host "`n=== Downloading Guofeng Cards ===" -ForegroundColor Cyan
$gDir = "e:\trae project\memory-match-game\assets\images\cards\guofeng"
for ($i = 0; $i -lt $guofeng.Count; $i++) {
    $card = $guofeng[$i]
    $num = $i + 1
    Write-Host "[$num/20] $($card.file) ..." -NoNewline
    $enc = [System.Uri]::EscapeDataString($card.prompt)
    $url = "https://image.pollinations.ai/prompt/$enc`?width=400&height=400&seed=$num&nologo=true"
    $path = Join-Path $gDir $card.file
    if (Test-Path $path) {
        $size = (Get-Item $path).Length
        if ($size -gt 1000) {
            Write-Host "  EXISTS ($size bytes)" -ForegroundColor Yellow
            continue
        }
    }
    Download-Image $url $path $card.file
    Start-Sleep -Seconds 3
}

# 下载和风卡牌
Write-Host "`n=== Downloading Japanese Cards ===" -ForegroundColor Cyan
$jDir = "e:\trae project\memory-match-game\assets\images\cards\japanese"
for ($i = 0; $i -lt $japanese.Count; $i++) {
    $card = $japanese[$i]
    $num = $i + 1
    Write-Host "[$num/20] $($card.file) ..." -NoNewline
    $enc = [System.Uri]::EscapeDataString($card.prompt)
    $seed = $num + 20
    $url = "https://image.pollinations.ai/prompt/$enc`?width=400&height=400&seed=$seed&nologo=true"
    $path = Join-Path $jDir $card.file
    if (Test-Path $path) {
        $size = (Get-Item $path).Length
        if ($size -gt 1000) {
            Write-Host "  EXISTS ($size bytes)" -ForegroundColor Yellow
            continue
        }
    }
    Download-Image $url $path $card.file
    Start-Sleep -Seconds 3
}

# 下载背景
Write-Host "`n=== Downloading Backgrounds ===" -ForegroundColor Cyan
$bgDir = "e:\trae project\memory-match-game\assets\images\bg"

Write-Host "[1/2] guofeng_bg.png ..." -NoNewline
$enc = [System.Uri]::EscapeDataString("Chinese ink painting background mountains mist serene watercolor")
$url = "https://image.pollinations.ai/prompt/$enc`?width=1920&height=1080&seed=100&nologo=true"
Download-Image $url (Join-Path $bgDir "guofeng_bg.png") "guofeng_bg"

Start-Sleep -Seconds 3

Write-Host "[2/2] japanese_bg.png ..." -NoNewline
$enc = [System.Uri]::EscapeDataString("Japanese watercolor cherry blossoms mountains serene soft background")
$url = "https://image.pollinations.ai/prompt/$enc`?width=1920&height=1080&seed=101&nologo=true"
Download-Image $url (Join-Path $bgDir "japanese_bg.png") "japanese_bg"

Write-Host "`n=== All Downloads Complete ===" -ForegroundColor Green

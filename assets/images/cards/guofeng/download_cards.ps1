$outDir = "e:\trae project\memory-match-game\assets\images\cards\guofeng"

$cards = @(
    @{ file="card_01.png"; prompt="a beautiful red chinese lantern hanging, traditional chinese hand painted watercolor illustration style, soft beige cream background, elegant minimalist composition, warm lighting" },
    @{ file="card_02.png"; prompt="a delicate blue and white porcelain vase with floral patterns, traditional chinese hand painted watercolor illustration, soft beige cream background, elegant minimalist" },
    @{ file="card_03.png"; prompt="an elegant chinese folding fan with bamboo handle and silk painting, traditional hand painted watercolor illustration, soft beige cream background" },
    @{ file="card_04.png"; prompt="a branch of plum blossoms with pink flowers, traditional chinese ink and watercolor painting style, soft beige cream background, elegant minimalist" },
    @{ file="card_05.png"; prompt="a beautiful pink peony flower in full bloom, traditional chinese watercolor painting style, soft beige cream background, elegant minimalist composition" },
    @{ file="card_06.png"; prompt="a pink lotus flower with green leaves on water, traditional chinese watercolor painting style, soft beige cream background, elegant minimalist" },
    @{ file="card_07.png"; prompt="green bamboo stalks with leaves, traditional chinese ink wash painting style, soft beige cream background, elegant minimalist composition" },
    @{ file="card_08.png"; prompt="yellow chrysanthemum flowers, traditional chinese watercolor painting style, soft beige cream background, elegant minimalist" },
    @{ file="card_09.png"; prompt="a traditional chinese tea set with teapot and cups with green tea leaves, hand painted watercolor illustration, soft beige cream background" },
    @{ file="card_10.png"; prompt="chinese calligraphy brush and ink stone with ink, traditional hand painted watercolor illustration, soft beige cream background, elegant minimalist" },
    @{ file="card_11.png"; prompt="a traditional chinese guqin musical instrument, hand painted watercolor illustration, soft beige cream background, elegant minimalist" },
    @{ file="card_12.png"; prompt="a colorful peking opera mask with intricate patterns, traditional chinese art style, hand painted watercolor illustration, soft beige cream background" },
    @{ file="card_13.png"; prompt="red chinese paper cutting art with floral pattern, traditional folk art style, hand painted watercolor illustration, soft beige cream background" },
    @{ file="card_14.png"; prompt="a red and gold chinese knot decoration with tassel, traditional hand painted watercolor illustration, soft beige cream background" },
    @{ file="card_15.png"; prompt="a traditional chinese dragon boat with dragon head, hand painted watercolor illustration, soft beige cream background, elegant minimalist" },
    @{ file="card_16.png"; prompt="a chinese guardian lion foo dog stone statue, traditional hand painted watercolor illustration, soft beige cream background" },
    @{ file="card_17.png"; prompt="an ancient chinese silk scroll with golden pattern, traditional hand painted watercolor illustration, soft beige cream background" },
    @{ file="card_18.png"; prompt="a green jade pendant with dragon carving, traditional chinese jewelry, hand painted watercolor illustration, soft beige cream background" },
    @{ file="card_19.png"; prompt="colorful koi fish swimming, traditional chinese watercolor painting style, soft beige cream background, elegant minimalist" },
    @{ file="card_20.png"; prompt="an elegant crane bird standing, traditional chinese ink wash painting style, soft beige cream background, elegant minimalist composition" }
)

$results = @()
$index = 0

foreach ($card in $cards) {
    $index++
    $encodedPrompt = [System.Uri]::EscapeDataString($card.prompt)
    $seed = Get-Random -Minimum 1 -Maximum 999999
    $url = "https://image.pollinations.ai/prompt/$encodedPrompt?width=400&height=400&seed=$seed&nologo=true"
    $outPath = Join-Path $outDir $card.file

    Write-Host "[$index/20] Downloading $($card.file) ..." -NoNewline
    try {
        $response = Invoke-WebRequest -Uri $url -Method GET -TimeoutSec 180 -UseBasicParsing -ErrorAction Stop
        if ($response.StatusCode -eq 200 -and $response.Content -and $response.Content.Length -gt 1000) {
            [System.IO.File]::WriteAllBytes($outPath, $response.Content)
            $size = $response.Content.Length
            Write-Host " OK ($size bytes)"
            $results += "$outPath"
        } else {
            Write-Host " FAILED (empty response or bad status)"
        }
    } catch {
        Write-Host " FAILED: $_"
    }
    Start-Sleep -Seconds 2
}

Write-Host "`n--- Generated Files ---"
$results | ForEach-Object { Write-Host $_ }

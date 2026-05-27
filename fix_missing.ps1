$gDir = "e:\trae project\memory-match-game\assets\images\cards\guofeng"
$jDir = "e:\trae project\memory-match-game\assets\images\cards\japanese"

function Download-Image($prompt, $outPath, $seed) {
    $enc = [System.Uri]::EscapeDataString($prompt)
    $url = "https://image.pollinations.ai/prompt/$enc`?width=400&height=400&seed=$seed&nologo=true"
    Write-Host "Downloading to $outPath ..." -NoNewline
    try {
        $response = Invoke-WebRequest -Uri $url -Method GET -TimeoutSec 120 -UseBasicParsing -ErrorAction Stop
        if ($response.StatusCode -eq 200 -and $response.Content -and $response.Content.Length -gt 1000) {
            [System.IO.File]::WriteAllBytes($outPath, $response.Content)
            Write-Host " OK ($($response.Content.Length) bytes)" -ForegroundColor Green
            return $true
        } else {
            Write-Host " FAILED" -ForegroundColor Red
            return $false
        }
    } catch {
        Write-Host " FAILED: $_" -ForegroundColor Red
        return $false
    }
}

Download-Image "yellow chrysanthemum Chinese traditional watercolor soft beige background" (Join-Path $gDir "chrysanthemum.png") 777
Start-Sleep -Seconds 3
Download-Image "Mount Fuji cherry blossoms Japanese watercolor painting soft cream background" (Join-Path $jDir "fuji.png") 888

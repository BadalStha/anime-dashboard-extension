# Icon URLs for different sizes (using a reliable CDN)
$icons = @{
    "16" = "https://cdn.jsdelivr.net/gh/microsoft/vscode@main/resources/win32/code_16.png"
    "48" = "https://cdn.jsdelivr.net/gh/microsoft/vscode@main/resources/win32/code_48.png"
    "128" = "https://cdn.jsdelivr.net/gh/microsoft/vscode@main/resources/win32/code_128.png"
}

# Create icons directory if it doesn't exist
$iconsDir = Join-Path $PSScriptRoot "icons"
if (-not (Test-Path $iconsDir)) {
    New-Item -ItemType Directory -Path $iconsDir -Force
}

# Download each icon
foreach ($size in $icons.Keys) {
    $outputPath = Join-Path $iconsDir "icon${size}.png"
    Invoke-WebRequest -Uri $icons[$size] -OutFile $outputPath
    Write-Host "Downloaded icon${size}.png"
}

Write-Host "Icons have been created successfully!"

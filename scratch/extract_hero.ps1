$src = "UIUX_허지민\Antigravity\05.수정\강사_제작예시.html"
$dst = "UIUX_허지민\Antigravity\05.수정\hero_test.html"

$lines = [System.IO.File]::ReadAllLines($src, [System.Text.Encoding]::UTF8)

# 0..2439: up to <body>
$head = $lines[0..2439]

# 2441..2561: header through </section> of #hero
$hero = $lines[2441..2561]

$closing = @("  </main>", "</body>", "</html>")

$result = [System.Collections.Generic.List[string]]::new()
$result.AddRange([string[]]$head)
$result.AddRange([string[]]$hero)
$result.AddRange([string[]]$closing)

[System.IO.File]::WriteAllLines($dst, $result, [System.Text.Encoding]::UTF8)
Write-Output "Successfully wrote $($result.Count) lines to $dst"

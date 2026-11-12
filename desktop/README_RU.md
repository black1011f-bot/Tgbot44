# Windows-сборка Bounty Hub — NEON LEGENDS

Этот каталог содержит Electron-оболочку для Windows. Сам интерфейс и игровые файлы берутся из исходного архива `BOUNTY_HUB_NEON_LEGENDS_V5_SOURCE(2).zip` в корне репозитория.

## Что создаётся

- `Bounty-Hub-NEON-LEGENDS-Setup-6.0.0.exe` — установщик Windows с ярлыком на рабочем столе.
- `Bounty-Hub-NEON-LEGENDS-Portable-6.0.0.exe` — запуск без установки.

Сборка запускается GitHub Actions при изменении исходного ZIP или workflow, а также вручную через **Actions → Build Bounty Hub Windows**. Готовые EXE публикуются в **Releases**.

Это локальная desktop-оболочка текущей версии исходника; она не добавляет сетевой мультиплеер или серверную функциональность.

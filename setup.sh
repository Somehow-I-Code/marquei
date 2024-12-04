#!/bin/bash

if [ ! -f "scripts/marquei.sh" ]; then
    echo "scripts/marquei.sh not found."
    exit 1
fi

if [[ "$SHELL" != */zsh ]]; then
    echo "This script is designed for zsh. Download it here: https://ohmyz.sh/."
    exit 1
fi

SHELL_CONFIG="$HOME/.zshrc"

CURRENT_DIR=$(pwd)

sed -i '' '/# MARQUEI_COMMANDS_START/,/# MARQUEI_COMMANDS_END/d' "$SHELL_CONFIG"

echo "Exporting MARQUEI_FOLDER_PATH to $SHELL_CONFIG\n"
echo "\n# MARQUEI_COMMANDS_START" >> "$SHELL_CONFIG"
echo "export MARQUEI_FOLDER_PATH=\"$CURRENT_DIR\"" >> "$SHELL_CONFIG"

echo "Appending .sh to $SHELL_CONFIG\n"
cat scripts/marquei.sh >> "$SHELL_CONFIG"
echo "# MARQUEI_COMMANDS_END" >> "$SHELL_CONFIG"

echo "Setup complete!\n"
echo "Type 'marquei' in your terminal to see the available commands.\n"

exec zsh
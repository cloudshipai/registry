#!/bin/bash

# Test script for Station bundle installation from registry
# This demonstrates the complete user workflow

set -e

echo "🚀 Station Registry Bundle Installation Test"
echo "============================================="

# Test environment name
TEST_ENV="registry-test-$(date +%s)"

echo "📦 Creating test environment: $TEST_ENV"
stn env create "$TEST_ENV"

echo "🔧 Pre-configuring variables to avoid prompts..."
mkdir -p "$HOME/.config/station/environments/$TEST_ENV"
cat > "$HOME/.config/station/environments/$TEST_ENV/variables.yml" << 'EOF'
ROOT_PATH: /tmp
NODE_ENV: development
EOF

echo "⬇️  Installing filesystem bundle from registry..."
BUNDLE_URL="https://github.com/cloudshipai/registry/raw/main/bundles/filesystem-bundle/filesystem-bundle.tar.gz"
stn bundle install "$BUNDLE_URL" --env "$TEST_ENV"

echo "🔄 Syncing environment..."
stn sync "$TEST_ENV"

echo "🤖 Listing installed agents..."
stn agent list --env "$TEST_ENV"

echo "🛠️  Testing MCP server connection..."
stn config list --env "$TEST_ENV"

echo "✅ Bundle installation test completed successfully!"
echo ""
echo "🎯 Next steps:"
echo "   • Run: stn agent run assistant 'list files in /tmp' --env $TEST_ENV"
echo "   • Run: stn agent run specialist 'check /tmp directory' --env $TEST_ENV"
echo "   • Run: stn env delete $TEST_ENV (to clean up)"
echo ""
echo "📋 Installation command for users:"
echo "   stn bundle install $BUNDLE_URL"
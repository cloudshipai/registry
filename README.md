# Station Registry

A curated collection of **Station environment bundles** for DevOps, Security, and AI-powered automation. Each bundle contains pre-configured AI agents, MCP tools, and complete environments ready for production deployment.

🌐 **Browse bundles:** [https://cloudshipai.github.io/registry](https://cloudshipai.github.io/registry)

## Quick Start

### 🚀 Install DevOps Security Bundle

The registry currently features our **DevOps Security Bundle** - a production-ready bundle with security scanning and Terraform validation agents.

#### Method 1: Station UI (Recommended)
1. Navigate to your Station instance: `http://localhost:8585`
2. Go to **Bundles** section
3. Paste bundle URL: `https://github.com/cloudshipai/registry/releases/latest/download/devops-security-bundle.tar.gz`
4. Select target environment name (e.g., `security-env`)
5. Click **"Install Bundle"**

#### Method 2: API Installation
```bash
curl -X POST http://localhost:8585/bundles/install \
  -H "Content-Type: application/json" \
  -d '{
    "bundle_location": "https://github.com/cloudshipai/registry/releases/latest/download/devops-security-bundle.tar.gz",
    "environment_name": "security-env",
    "source": "remote"
  }'
```

### 📦 What's Included

The **DevOps Security Bundle** contains:

| Component | Details |
|-----------|---------|
| **Security Scanner Agent** | Comprehensive vulnerability scanning using Checkov security tools |
| **Terraform Auditor Agent** | Infrastructure as Code validation using TFLint best practices |
| **MCP Tools** | 16 security tools ready for CI/CD integration |
| **Ship CLI Integration** | Checkov and TFLint MCP servers with containerized execution |

**Tools Available:**
- `__checkov_scan_directory` - Directory security scanning
- `__checkov_scan_file` - Individual file security analysis  
- `__checkov_scan_secrets` - Secret and credential detection
- `__tflint_check` - Terraform validation and linting
- `__tflint_init` - TFLint configuration initialization
- And 11 additional security analysis tools

## What are Station Bundles?

Station bundles are portable environment packages that contain:
- **Pre-configured AI agents** with specialized prompts for specific tasks
- **MCP tool configurations** connecting to security, DevOps, and development tools  
- **Complete environments** ready for immediate deployment and use

## Bundle Structure

Station bundles use a simple, API-compatible structure:

```
bundle.tar.gz
├── agents/                    # Agent definition files
│   ├── Security Scanner.prompt
│   └── Terraform Auditor.prompt  
├── ship-security.json         # MCP server configurations
└── other-tools.json          # Additional MCP configs
```

This format is compatible with:
- Station Bundle API (`POST /bundles/install`)
- Station CLI (`stn bundle` command)
- Station MCP tools (for Claude Code integration)

## Creating Your Own Bundles

### Step 1: Set Up Your Station Environment

```bash
# Configure your environment with agents and MCP tools
stn load https://github.com/shiptools/ship-checkov
stn load https://github.com/shiptools/ship-tflint

# Create specialized agents
stn agent create --name "My Security Agent" \
  --description "Custom security scanning agent" \
  --tools "__checkov_scan_directory,__checkov_scan_file"
```

### Step 2: Create Bundle from Environment

```bash
# Method 1: CLI command (recommended)
stn bundle my-environment --output my-custom-bundle.tar.gz

# Method 2: MCP tools (for Claude Code)
create_bundle_from_environment(environmentName="my-environment", outputPath="./bundle.tar.gz")

# Method 3: API integration
curl -X POST http://localhost:8585/api/v1/bundles \
  -H "Content-Type: application/json" \
  -d '{"environment_name": "my-environment", "output_path": "./bundle.tar.gz"}'
```

### Step 3: Test Your Bundle

```bash
# Test installation in clean environment
curl -X POST http://localhost:8585/bundles/install \
  -H "Content-Type: application/json" \
  -d '{
    "bundle_location": "./my-custom-bundle.tar.gz",
    "environment_name": "test-install",
    "source": "file"
  }'

# Verify agents work
stn agent run "My Security Agent" "Test scan of current directory"
```

### Step 4: Add to Registry

1. **Fork this repository**
   ```bash
   git clone https://github.com/YOUR-USERNAME/registry
   cd registry
   ```

2. **Create bundle directory and add files**
   ```bash
   # Extract bundle contents for source
   mkdir -p my-custom-bundle
   tar -xzf my-custom-bundle.tar.gz -C my-custom-bundle/
   
   # Add to registry
   cp my-custom-bundle.tar.gz ./
   git lfs track "*.tar.gz"  # Ensure LFS tracking
   ```

3. **Update registry metadata**
   ```bash
   # Add bundle entry to docs/index.json
   # Update the bundles array with your bundle details
   ```

4. **Submit pull request**
   ```bash
   git add .
   git commit -m "Add my-custom-bundle to registry"
   git push origin main
   # Create PR on GitHub
   ```

## 🚀 Proven CI/CD Integration

Station bundles work perfectly in CI/CD pipelines. The DevOps Security Bundle has been **successfully tested** in production CI/CD workflows.

### Real-World Success: [agents-cicd Repository](https://github.com/cloudshipai/agents-cicd)

Our DevOps Security Bundle powers the `agents-cicd` repository with automated security analysis:

```yaml
name: Station Security Analysis
on: [push, pull_request]

jobs:
  security-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Station Security Analysis
        run: |
          docker run \
            -v $(pwd):/workspace:ro \
            -v /var/run/docker.sock:/var/run/docker.sock \
            -e OPENAI_API_KEY=${{ secrets.OPENAI_API_KEY }} \
            -e ENCRYPTION_KEY=${{ secrets.STATION_ENCRYPTION_KEY }} \
            epuerta18/station-default:latest \
            bash -c "
              stn agent run 'Security Scanner' 'Comprehensive security scan of /workspace directory focusing on vulnerabilities, secrets, and misconfigurations'
              stn agent run 'Terraform Auditor' 'Analyze any Terraform files for security and best practices'
            "

      - name: PR Comment with Results
        if: github.event_name == 'pull_request'
        uses: actions/github-script@v7
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,  
              repo: context.repo.repo,
              body: '🤖 **Station AI Security Analysis Complete**\n\nSecurity agents have analyzed this PR for vulnerabilities and best practices. Check the workflow logs for detailed findings and recommendations.'
            })
```

### Key Benefits Proven in Production:
- ✅ **Automated Security Scanning** - Detects vulnerabilities without manual intervention
- ✅ **Terraform Validation** - Ensures infrastructure code follows best practices  
- ✅ **PR Integration** - Automatic comments with security analysis results
- ✅ **Ship CLI Integration** - 80+ security tools available via containerized MCP servers
- ✅ **Zero Configuration** - Works out of the box with Docker containers

### Bundle Requirements

- ✅ Must be tested in clean environment before submission
- ✅ Must include working agents with proper tool assignments  
- ✅ Must work with Station Bundle API installation
- ✅ Must include source files (agents/, *.json configs)
- ✅ Must have unique agent names within bundle
- ✅ Should include example usage documentation

## Development

### Git LFS Setup

This repository uses Git LFS to store `.tar.gz` bundle files:

```bash
# Install Git LFS
git lfs install

# Track tar.gz files (already configured)
git lfs track "*.tar.gz"

# Clone with LFS files
git clone https://github.com/cloudshipai/registry
cd registry
git lfs pull
```

### Local Development

```bash
# Serve the site locally
cd docs
python -m http.server 8000

# Open http://localhost:8000 in your browser
```

### Registry API

The registry provides a JSON API at `/docs/index.json` with current bundle information:

```json
{
  "registry_name": "CloudShip Station Registry",
  "description": "Official registry for Station DevOps Security automation bundles",
  "version": "1.0.0",
  "base_url": "https://github.com/cloudshipai/registry/raw/main",
  "site_url": "https://cloudshipai.github.io/registry",
  "bundles": [
    {
      "id": "devops-security-bundle",
      "name": "DevOps Security Automation Bundle",
      "description": "DevOps Security automation bundle with Checkov and TFLint agents for infrastructure security scanning and Terraform validation",
      "version": "1.0.0",
      "author": "CloudShip AI",
      "tags": ["devops", "security", "checkov", "terraform", "cicd"],
      "download_url": "https://github.com/cloudshipai/registry/releases/latest/download/devops-security-bundle.tar.gz",
      "source_url": "https://github.com/cloudshipai/registry/tree/main/devops-security-bundle",
      "file_size": 1514,
      "created_at": "2025-08-28T19:49:57Z",
      "verified": true,
      "popular": true
    }
  ],
  "categories": {
    "devops-security": ["devops-security-bundle"]
  },
  "featured_bundles": ["devops-security-bundle"]
}
```

## License

This registry and its bundles are licensed under the MIT License. See individual bundle licenses for specific terms.

## Support

- 📖 [Station CLI Documentation](https://github.com/cloudshipai/station)
- 🐛 [Report Issues](https://github.com/cloudshipai/registry/issues)
- 💬 [Discussions](https://github.com/cloudshipai/registry/discussions)

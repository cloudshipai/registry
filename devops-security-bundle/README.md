# DevOps Security Bundle

A comprehensive Station environment bundle for DevOps security automation featuring Ship CLI integration and intelligent AI agents.

## 🛡️ Overview

This bundle provides a complete DevOps security automation environment with:

- **Security Scanner Agent**: Comprehensive security analysis using Checkov
- **Terraform Auditor Agent**: Infrastructure-as-Code security validation using TFLint
- **Ship CLI Integration**: 80+ security tools available through MCP
- **CI/CD Ready**: Designed for seamless integration with GitHub Actions and other CI/CD systems

## 🚀 Features

### Security Agents

1. **Security Scanner Agent**
   - Uses Checkov for comprehensive security scanning
   - Analyzes infrastructure code, containers, and secrets
   - Provides detailed remediation guidance
   - Supports multiple file formats and cloud providers

2. **Terraform Auditor Agent**
   - TFLint integration for Terraform best practices
   - Infrastructure security validation
   - Policy compliance checking
   - Automated security recommendations

### MCP Tools Available

Through Ship CLI integration:
- **Checkov**: Infrastructure security scanning
- **TFLint**: Terraform linting and validation
- And 78+ other security tools accessible via MCP

## 📋 Prerequisites

- Station v0.2.7 or higher
- Ship CLI v0.7.3+ (automatically installed during build)
- Docker (for containerized deployments)
- OpenAI, Anthropic, or Gemini API key

## 🏁 Quick Start

### 1. Install the Bundle

```bash
# Install from registry
stn template install devops-security-bundle

# Or install to specific environment
stn template install devops-security-bundle production
```

### 2. Configure API Keys

```bash
# Set your AI provider API key
export OPENAI_API_KEY="your-api-key-here"
# or
export ANTHROPIC_API_KEY="your-api-key-here"
```

### 3. Build Environment

```bash
# Build containerized environment
stn build env default --provider openai --model gpt-4o --ship
```

### 4. Run Security Analysis

```bash
# Execute security scanner on your project
stn agent run "Security Scanner" "Perform comprehensive security analysis of this repository"

# Run Terraform audit
stn agent run "Terraform Auditor" "Analyze terraform/ directory for security issues and best practices"
```

## 🔧 CI/CD Integration

### GitHub Actions Example

```yaml
name: Station DevOps Security

on: [push, pull_request]

jobs:
  security-analysis:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Run Security Analysis
        run: |
          docker run --rm \
            -v "$(pwd):/workspace" \
            -v /var/run/docker.sock:/var/run/docker.sock \
            -e OPENAI_API_KEY="${{ secrets.OPENAI_API_KEY }}" \
            epuerta18/station-default:latest bash -c "
              cd /workspace &&
              stn agent run 'Security Scanner' 'Perform comprehensive security analysis and create detailed report with findings and recommendations' &&
              stn agent run 'Terraform Auditor' 'Analyze terraform configurations for security issues, compliance violations, and best practices'
            "
```

## 📁 Bundle Contents

```
devops-security-bundle/
├── agents/
│   ├── Security Scanner.prompt      # AI agent for security analysis
│   └── Terraform Auditor.prompt     # AI agent for Terraform auditing
├── template.json                    # MCP server configurations
├── manifest.json                    # Bundle metadata
├── variables.schema.json            # Variable schema (empty for this bundle)
└── README.md                        # This file
```

## 🔒 Security Features

- **Comprehensive Scanning**: Covers infrastructure, containers, secrets, and more
- **Multi-Cloud Support**: AWS, Azure, GCP, and Kubernetes
- **Policy Enforcement**: Customizable security policies and compliance checks
- **Automated Remediation**: AI-powered suggestions for fixing security issues
- **CI/CD Integration**: Seamless integration with existing pipelines

## 🛠️ Advanced Usage

### Custom Security Policies

The bundle supports custom security policies through Ship CLI configuration. You can extend the security analysis by:

1. Adding custom Checkov policies
2. Configuring TFLint rules
3. Creating custom Ship CLI tool integrations

### Environment Variables

The bundle respects standard environment variables:
- `OPENAI_API_KEY` - OpenAI API key
- `ANTHROPIC_API_KEY` - Anthropic API key  
- `GEMINI_API_KEY` - Google Gemini API key
- `GENKIT_ENV` - Genkit environment (defaults to 'prod')

## 📚 Documentation

- [Station Documentation](https://docs.station.ai)
- [Ship CLI Documentation](https://ship.cloudship.ai)
- [Checkov Documentation](https://www.checkov.io/1.Introduction/Getting%20Started.html)
- [TFLint Documentation](https://github.com/terraform-linters/tflint)

## 🤝 Contributing

This bundle is part of the Station ecosystem. To contribute:

1. Fork the Station repository
2. Create your feature branch
3. Submit a pull request

## 📄 License

This bundle is distributed under the same license as Station.

## 🆘 Support

- [GitHub Issues](https://github.com/cloudshipai/station/issues)
- [Station Community](https://docs.station.ai)
- [Ship CLI Support](https://ship.cloudship.ai)

---

**Built with ❤️ using Station v0.2.7**
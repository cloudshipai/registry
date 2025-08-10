# Station Registry

A curated collection of MCP (Model Context Protocol) bundles for [Station CLI](https://github.com/cloudshipai/station).

🌐 **Browse bundles:** [https://cloudshipai.github.io/registry](https://cloudshipai.github.io/registry)

## Quick Start

### Install a Bundle

```bash
# Install directly from GitHub
stn bundle install https://github.com/cloudshipai/registry/raw/main/bundles/filesystem-bundle/filesystem-bundle.tar.gz

# Or browse available bundles at the registry site
```

### Available Bundles

| Bundle | Description | Install Command |
|--------|-------------|-----------------|
| **Filesystem Tools** | Essential filesystem operations with intelligent agents | `stn bundle install https://github.com/cloudshipai/registry/raw/main/bundles/filesystem-bundle/filesystem-bundle.tar.gz` |

## Bundle Structure

Each bundle in this registry follows the Station bundle format:

```
bundles/
├── bundle-name/
│   ├── manifest.json          # Bundle metadata
│   ├── template.json          # MCP server configuration template
│   ├── variables.schema.json  # Variable definitions
│   ├── agents/                # Agent prompt files
│   │   ├── agent1.prompt
│   │   └── agent2.prompt
│   ├── examples/              # Example variable configurations
│   │   ├── development.vars.yml
│   │   └── production.vars.yml
│   ├── README.md              # Bundle documentation
│   ├── bundle-name.tar.gz     # Packaged bundle (Git LFS)
│   └── bundle-name.json       # Bundle metadata for registry
```

## Contributing

### Adding a New Bundle

1. **Create your bundle source:**
   ```bash
   # Use Station CLI to create a new bundle
   stn bundle create my-awesome-bundle
   ```

2. **Test your bundle:**
   ```bash
   # Package and test your bundle
   stn bundle package my-awesome-bundle
   stn bundle install my-awesome-bundle.tar.gz
   ```

3. **Add to registry:**
   ```bash
   # Fork this repository
   git clone https://github.com/YOUR-USERNAME/registry
   cd registry
   
   # Create bundle directory
   mkdir -p bundles/my-awesome-bundle
   
   # Copy your bundle source
   cp -r path/to/your/bundle/* bundles/my-awesome-bundle/
   cp my-awesome-bundle.tar.gz bundles/my-awesome-bundle/
   
   # Create metadata file
   cp bundles/filesystem-bundle/filesystem-bundle.json bundles/my-awesome-bundle/my-awesome-bundle.json
   # Edit the metadata file with your bundle details
   ```

4. **Update registry index:**
   ```bash
   # Add your bundle entry to index.json
   # Update the bundles array, categories, etc.
   ```

5. **Submit pull request:**
   ```bash
   git add .
   git commit -m "Add my-awesome-bundle to registry"
   git push origin main
   # Create pull request on GitHub
   ```

### Bundle Requirements

- ✅ Must include complete source code
- ✅ Must include proper metadata files
- ✅ Must be tested and working
- ✅ Must include comprehensive README
- ✅ Must follow Station bundle format
- ✅ Agent names must be unique within bundle
- ✅ Must include example variable configurations

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

The registry provides a JSON API at `/index.json`:

```json
{
  "registry_name": "CloudShipAI Station Registry",
  "version": "1.0.0",
  "base_url": "https://github.com/cloudshipai/registry/raw/main",
  "site_url": "https://cloudshipai.github.io/registry",
  "bundles": [
    {
      "id": "filesystem-bundle",
      "name": "Filesystem Tools",
      "description": "Essential filesystem operations...",
      "version": "1.0.0",
      "download_url": "https://github.com/.../filesystem-bundle.tar.gz",
      "source_url": "https://github.com/.../tree/main/bundles/filesystem-bundle",
      "tags": ["filesystem", "file-management"],
      "file_size": 2123,
      "created_at": "2025-08-10T19:33:00Z"
    }
  ],
  "categories": {
    "file-management": ["filesystem-bundle"]
  }
}
```

## License

This registry and its bundles are licensed under the MIT License. See individual bundle licenses for specific terms.

## Support

- 📖 [Station CLI Documentation](https://github.com/cloudshipai/station)
- 🐛 [Report Issues](https://github.com/cloudshipai/registry/issues)
- 💬 [Discussions](https://github.com/cloudshipai/registry/discussions)

# Filesystem Bundle

Essential filesystem operations with MCP server integration and working agents

## Installation

```bash
stn template install filesystem-updated
```

## Usage

```bash
# Sync with your environment (will prompt for required variables)
stn sync

# Set the ROOT_PATH variable for your use case
export ROOT_PATH="/tmp"  # or your preferred directory
stn sync
```

## Required Variables

- `ROOT_PATH`: Root filesystem path for file operations (default: `/tmp`)

## Agents Included

### Assistant Agent
- **Name**: `assistant`
- **Description**: General-purpose filesystem operations with full tool access
- **Model**: `gemini-2.5-flash`
- **Max Steps**: 5
- **Tools**: Create directories, edit files, list directories, read files, get file info, search files

### Specialist Agent  
- **Name**: `specialist`
- **Description**: Focused filesystem tasks with minimal steps
- **Model**: `gemini-2.5-flash`
- **Max Steps**: 3
- **Tools**: Create directories, list directories, read files, get file info

## Available Tools

- `__create_directory`: Create new directories
- `__edit_file`: Create, modify, and update text files
- `__list_directory`: List directory contents with detailed information
- `__read_text_file`: Read and analyze text files
- `__get_file_info`: Get detailed file/directory metadata
- `__search_files`: Search for files and content within the filesystem

## Example Usage

```bash
# Run the assistant agent for general filesystem tasks
stn agent run assistant "create a project directory structure"

# Run the specialist agent for quick operations
stn agent run specialist "list the contents of the current directory"
```

## Examples

See the `examples/` directory for sample configurations.

## License



// This is the new bundle rendering code to be integrated
function renderBundles() {
    console.log('Rendering bundles...');
    console.log('Filtered bundles:', filteredBundles);
    const grid = document.getElementById('bundleGrid');
    
    if (filteredBundles.length === 0) {
        console.log('No bundles to render');
        grid.innerHTML = `
            <div class="no-results fade-in">
                <div class="no-results-icon">🔍</div>
                <h3>No bundles found</h3>
                <p>Try adjusting your search or filter criteria</p>
            </div>
        `;
        return;
    }

    console.log(`Rendering ${filteredBundles.length} bundles`);
    grid.innerHTML = filteredBundles.map((bundle, index) => {
        const isVerified = bundle.verified || false;
        const isPopular = bundle.popular || false;
        
        return `
            <div class="bundle-card fade-in" style="animation-delay: ${index * 0.1}s">
                <div class="bundle-image" style="background: ${getGradientForCategory(bundle.tags?.[0] || 'default')};">
                    <div class="bundle-badges">
                        ${isVerified ? '<span class="badge badge-verified">✓ Verified</span>' : ''}
                        ${isPopular ? '<span class="badge badge-popular">🔥 Popular</span>' : ''}
                    </div>
                    <div class="bundle-image-icon">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z"/>
                        </svg>
                    </div>
                </div>
                <div class="bundle-content">
                    <div class="bundle-header">
                        <h3 class="bundle-title">${bundle.name}</h3>
                        ${bundle.tags ? `
                        <div class="bundle-tags">
                            ${bundle.tags.slice(0, 3).map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                        ` : ''}
                        <div class="bundle-meta">
                            <span class="bundle-version">v${bundle.version}</span>
                            ${bundle.rating ? `
                            <div class="bundle-rating">
                                <span>⭐</span>
                                <span>${bundle.rating}</span>
                            </div>
                            ` : ''}
                        </div>
                    </div>
                    <p class="bundle-description" title="${bundle.description}">${bundle.description}</p>
                    
                    <!-- Bundle Components Info -->
                    ${(bundle.mcps && bundle.mcps.length > 0) || (bundle.agents && bundle.agents.length > 0) ? `
                    <div class="bundle-info-row">
                        ${bundle.mcps && bundle.mcps.length > 0 ? `
                        <div class="bundle-info-item">
                            <span class="info-icon">🔌</span>
                            <span class="info-label">MCPs:</span>
                            <span class="info-value">${bundle.mcps.length}</span>
                        </div>
                        ` : ''}
                        ${bundle.agents && bundle.agents.length > 0 ? `
                        <div class="bundle-info-item">
                            <span class="info-icon">🤖</span>
                            <span class="info-label">Agents:</span>
                            <span class="info-value">${bundle.agents.length}</span>
                        </div>
                        ` : ''}
                        <button class="info-expand-btn" onclick="toggleDetailsDropdown(this)" aria-expanded="false">
                            <span>View Details</span>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M7 10l5 5 5-5z"/>
                            </svg>
                        </button>
                    </div>
                    ` : ''}
                    
                    <!-- Expandable Details Section -->
                    ${(bundle.mcps && bundle.mcps.length > 0) || (bundle.agents && bundle.agents.length > 0) ? `
                    <div class="bundle-details-dropdown" style="display: none;">
                        ${bundle.mcps && bundle.mcps.length > 0 ? `
                        <div class="detail-section">
                            <h4 class="detail-title">🔌 MCP Tools (${bundle.mcps.length})</h4>
                            <div class="detail-list">
                                ${bundle.mcps.map(mcp => `
                                    <div class="detail-item">
                                        <div class="detail-item-header">
                                            <span class="detail-name">${mcp.name}</span>
                                            <span class="detail-count">${mcp.tools.length} tools</span>
                                        </div>
                                        <p class="detail-description">${mcp.description}</p>
                                        <div class="detail-tags">
                                            ${mcp.tools.slice(0, 3).map(tool => `<span class="detail-tag">${tool}</span>`).join('')}
                                            ${mcp.tools.length > 3 ? `<span class="detail-tag-more">+${mcp.tools.length - 3} more</span>` : ''}
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        ` : ''}
                        
                        ${bundle.agents && bundle.agents.length > 0 ? `
                        <div class="detail-section">
                            <h4 class="detail-title">🤖 Agents (${bundle.agents.length})</h4>
                            <div class="detail-list">
                                ${bundle.agents.map(agent => `
                                    <div class="detail-item">
                                        <div class="detail-item-header">
                                            <span class="detail-name">${agent.name}</span>
                                            <span class="detail-count">${agent.capabilities.length} capabilities</span>
                                        </div>
                                        <p class="detail-description">${agent.description}</p>
                                        <div class="detail-tags">
                                            ${agent.capabilities.slice(0, 3).map(cap => `<span class="detail-tag">${cap}</span>`).join('')}
                                            ${agent.capabilities.length > 3 ? `<span class="detail-tag-more">+${agent.capabilities.length - 3} more</span>` : ''}
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        ` : ''}
                    </div>
                    ` : ''}
                    
                    <!-- Installation Command - Prominent Display -->
                    <div class="install-command-prominent">
                        <div class="install-command-header">
                            <span class="install-icon">💻</span>
                            <span class="install-text">Quick Install</span>
                        </div>
                        <div class="install-command-content">
                            <input type="text" class="install-command-text" value="stn template install ${bundle.download_url}" readonly>
                            <button class="copy-btn-prominent" onclick="copyToClipboard('stn template install ${bundle.download_url}', this)" title="Copy to clipboard">
                                <svg class="copy-icon" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                                    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    
                    <div class="bundle-stats">
                        <div class="bundle-stat">
                            <span>📦</span>
                            <span>${(bundle.file_size / 1024).toFixed(1)}KB</span>
                        </div>
                        ${bundle.downloads ? `
                        <div class="bundle-stat">
                            <span>📥</span>
                            <span>${bundle.downloads.toLocaleString()}</span>
                        </div>
                        ` : ''}
                        <div class="bundle-stat">
                            <span>👤</span>
                            <span>${bundle.author}</span>
                        </div>
                    </div>
                    
                    <div class="bundle-actions">
                        <a href="${bundle.download_url}" class="btn btn-primary" download aria-label="Download ${bundle.name}">
                            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                            </svg>
                            Install Bundle
                        </a>
                        <a href="${bundle.source_url}" class="btn btn-secondary" target="_blank" title="View Source" aria-label="View source for ${bundle.name}">
                            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function toggleDetailsDropdown(button) {
    const card = button.closest('.bundle-card');
    const dropdown = card.querySelector('.bundle-details-dropdown');
    const isExpanded = button.getAttribute('aria-expanded') === 'true';
    
    if (isExpanded) {
        dropdown.style.display = 'none';
        button.setAttribute('aria-expanded', 'false');
        button.querySelector('svg').style.transform = 'rotate(0deg)';
    } else {
        dropdown.style.display = 'block';
        button.setAttribute('aria-expanded', 'true');
        button.querySelector('svg').style.transform = 'rotate(180deg)';
    }
}

function renderFilters() {
    const filters = document.getElementById('filters');
    const tagCounts = {};
    
    // Count bundles per tag
    bundles.forEach(bundle => {
        if (bundle.tags) {
            bundle.tags.forEach(tag => {
                tagCounts[tag] = (tagCounts[tag] || 0) + 1;
            });
        }
    });

    // Sort tags by count (descending)
    const sortedTags = Object.entries(tagCounts)
        .sort((a, b) => b[1] - a[1])
        .map(([tag]) => tag);

    // Add 'all' at the beginning
    const allTags = ['all', ...sortedTags];

    filters.innerHTML = '';
    allTags.forEach(tag => {
        const button = document.createElement('button');
        button.className = `filter-tag ${tag === 'all' ? 'active' : ''}`;
        button.dataset.filter = tag;
        
        const tagName = tag.charAt(0).toUpperCase() + tag.slice(1).replace('-', ' ');
        const count = tag === 'all' ? bundles.length : tagCounts[tag];
        
        button.innerHTML = `
            <span>${tagName}</span>
            <span class="filter-count">${count}</span>
        `;
        
        button.addEventListener('click', () => filterBundles(tag));
        filters.appendChild(button);
    });
}
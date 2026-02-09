//
// Search icons here https://icon-sets.iconify.design/?query=disk
//
export const D3F_SHAPE_ICON_MAP: Record<string, { shape: string, icon?: string }> = {
        'd3f:Process': { shape: 'rect', /*icon: 'mdi:deployed_code'*/ },
        'd3f:Credential': { shape: 'notch-rect', icon: 'mdi:key' },
        'd3f:Browser': { shape: 'circle', icon: 'logos:firefox' },
        'd3f:AccessToken': { shape: 'notch-rect', icon: 'symbols:token' },

        // Resources / Messaging
        'd3f:DigitalEventRecord': { shape: 'rounded' },
        'd3f:DatabaseQuery': { shape: 'rounded', icon: 'mdi:sql-query' },
        /*
        Email["d3f:Email"]@{shape: "rounded", icon: "mdi:email"}
        EmailAttachment["d3f:EmailAttachment"]@{shape: "rounded", icon: "symbols:attach-email"}
        MessageAnalysis["d3f:MessageAnalysis"]@{shape: "rounded", icon: "mdi:"}
        MessageEncryption["d3f:MessageEncryption"]@{shape: "rounded", icon: "symbols:mail-lock"}
        */
        'd3f:Email': { shape: 'rounded', icon: 'mdi:email' },
        'd3f:EmailAttachment': { shape: 'rounded', icon: 'symbols:attach-email' },
        'd3f:MessageAnalysis': { shape: 'rounded', icon: 'mdi:message-text' },
        'd3f:MessageEncryption': { shape: 'rounded', icon: 'symbols:mail-lock' },

        // Users
        'd3f:PrivilegedUserAccount': { shape: 'rect', icon: 'symbols:admin-panel-settings' },
        'd3f:UserAccount': { shape: 'circle', icon: 'mdi:account_circle' },
        'd3f:User': { shape: 'circle', icon: 'mdi:person' },

        // Network intermediaries
        'd3f:ReverseProxyServer': { shape: 'diamond', icon: 'mdi:proxy' },
        'd3f:ForwardProxyServer': { shape: 'diamond', icon: 'mdi:proxy' },
        'd3f:Firewall': { shape: 'diamond', icon: 'mdi:firewall' },
        'd3f:WebApplicationFirewall': { shape: 'diamond', icon: 'mdi:firewall' },

        // Network
        'd3f:IPAddress': { shape: 'tri', icon: 'mdi:ip-network' },
        'd3f:InternetNetworkTraffic': { shape: 'lin-rect', icon: 'mdi:web' },
        'd3f:SSHSession': { shape: 'lin-rect', icon: 'mdi:ssh' },

        // Storage
        'd3f:ContainerRegistry': { shape: 'database', icon: 'symbols:hand-package' },
        'd3f:CodeRepository': { shape: 'database', icon: 'mdi:git' },
        'd3f:ContainerImage': { shape: 'disk', icon: 'mdi:album' },
        'd3f:SoftwareArtifactServer': { shape: 'database' },
        'd3f:Volume': { shape: 'disk', icon: "mdi:harddisk"  },
        
        // Store network
        'd3f:NetworkFileShareResource': { shape: 'disk', icon: 'symbols:folder-shared' },
        'd3f:FileTransferNetworkTraffic': { shape: 'braces', icon: 'mdi:file-swap' },
        'd3f:FileShareService': { shape: 'disk', icon: 'symbols:smb-share' },
        'd3f:CloudStorage': { shape: 'disk', icon: 'mdi:cloud-upload' },

        // Resources
        'd3f:ConfigurationResource': { shape: 'lin-doc', },
        'd3f:ContainerOrchestrationSoftware': { shape: 'processes', icon: 'logos:kubernetes' },
        // Other
        'd3f:SoftwareDeploymentTool': { shape: 'rect', icon: 'mdi:package-variant' },

        // Places
        'd3f:PhysicalLocation': { shape: 'hexagon', icon: 'symbols:apartment' },
        // Techniques
        'd3f:RestoreDatabase': { shape: 'disk', icon: 'mdi:database-refresh' },
        // Servers
        'd3f:Server': { shape: 'rect', icon: 'mdi:server' },
        'd3f:Database': { shape: 'database', },
        'd3f:DNSServer': { shape: 'rect', icon: 'mdi:dns' },
        'd3f:WebServerApplication': { shape: 'rect', icon: 'mdi:application-braces' },
        'd3f:AuthenticationService': { shape: 'rect', icon: 'mdi:shield-key' },

        // Files
    };

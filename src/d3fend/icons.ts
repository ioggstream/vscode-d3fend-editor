export const D3F_SHAPE_ICON_MAP: Record<string, { shape: string, icon?: string }> = {
        'd3f:Process': { shape: 'rect', icon: 'mdi:deployed_code' },
        'd3f:Credential': { shape: 'notch-rect', icon: 'mdi:key' },
        'd3f:Browser': { shape: 'circle', icon: 'mdi:web_asset' },

        // Resources
        'd3f:DigitalEventRecord': { shape: 'rounded' },

        // Users
        'd3f:PrivilegedUserAccount': { shape: 'rect', icon: 'mdi:shield_account' },
        'd3f:UserAccount': { shape: 'circle', icon: 'mdi:account_circle' },
        'd3f:User': { shape: 'circle', icon: 'mdi:person' },

        // Network
        'd3f:IPAddress': { shape: 'tri', icon: 'mdi:ip-network' },
        'd3f:ReverseProxyServer': { shape: 'rect', icon: 'mdi:arrow-decision' },
        'd3f:InternetNetworkTraffic': { shape: 'lin-rect', icon: 'mdi:web' },
        'd3f:SSHSession': { shape: 'lin-rect', icon: 'mdi:ssh' },

        // Storage
        'd3f:ContainerRegistry': { shape: 'cyl', icon: 'mdi:package' },
        'd3f:CodeRepository': { shape: 'cyl', icon: 'mdi:graph_1' },
        'd3f:ContainerImage': { shape: 'lin-cyl', icon: 'mdi:album' },
        'd3f:SoftwareArtifactServer': { shape: 'cyl' },
        'd3f:Volume': { shape: 'lin-cyl', icon: "mdi:hard_disk"  },
        'd3f:NetworkFileShareResource': { shape: 'lin-cyl', icon: 'mdi:folder lans' },
        'd3f:FileShareService': { shape: 'lin-cyl', icon: 'mdi:folder lan' },


        // Resources
        'd3f:ConfigurationResource': { shape: 'lin-doc', },
        'd3f:ContainerOrchestrationSoftware': { shape: 'processes', },
        // Other
        'd3f:SoftwareDeploymentTool': { shape: 'rect', icon: 'mdi:package-variant' },

        // Techniques
        'd3f:RestoreDatabase': { shape: 'lin-cyl', icon: 'mdi:database-refresh' },
        // Servers
        'd3f:Server': { shape: 'rect', icon: 'mdi:server' },
        'd3f:Database': { shape: 'cyl', },
        'd3f:DNSServer': { shape: 'rect', icon: 'mdi:dns' },
        'd3f:WebServerApplication': { shape: 'rect', icon: 'mdi:application-braces' },
        'd3f:AuthenticationService': { shape: 'rect', icon: 'mdi:shield-key' },
    };

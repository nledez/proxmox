[
   {
      "info" : {
         "GET" : {
            "parameters" : {
               "additionalProperties" : 0
            },
            "permissions" : {
               "user" : "all"
            },
            "returns" : {
               "type" : "array",
               "items" : {
                  "type" : "object",
                  "properties" : {}
               },
               "links" : [
                  {
                     "rel" : "child",
                     "href" : "{name}"
                  }
               ]
            },
            "name" : "index",
            "method" : "GET",
            "description" : "Cluster index."
         }
      },
      "text" : "cluster",
      "children" : [
         {
            "info" : {
               "POST" : {
                  "parameters" : {
                     "additionalProperties" : 0,
                     "properties" : {
                        "bwlimit" : {
                           "minimum" : 0,
                           "type" : "integer",
                           "optional" : 1,
                           "description" : "Limit I/O bandwidth (KBytes per second)."
                        },
                        "remove" : {
                           "type" : "boolean",
                           "optional" : 1,
                           "default" : 1,
                           "description" : "Remove old backup files if there are more than 'maxfiles' backup files."
                        },
                        "dumpdir" : {
                           "type" : "string",
                           "optional" : 1,
                           "description" : "Store resulting files to specified directory."
                        },
                        "tmpdir" : {
                           "type" : "string",
                           "optional" : 1,
                           "description" : "Store temporary files to specified directory."
                        },
                        "stopwait" : {
                           "minimum" : 0,
                           "type" : "integer",
                           "optional" : 1,
                           "description" : "Maximal time to wait until a VM is stopped (minutes)."
                        },
                        "mode" : {
                           "enum" : [
                              "snapshot",
                              "suspend",
                              "stop"
                           ],
                           "type" : "string",
                           "optional" : 1,
                           "default" : "stop",
                           "description" : "Backup mode."
                        },
                        "all" : {
                           "type" : "boolean",
                           "optional" : 1,
                           "default" : 0,
                           "description" : "Backup all known VMs on this host."
                        },
                        "node" : {
                           "format" : "pve-node",
                           "optional" : 1,
                           "type" : "string",
                           "description" : "Only run if executed on this node."
                        },
                        "size" : {
                           "minimum" : 500,
                           "type" : "integer",
                           "optional" : 1,
                           "description" : "LVM snapshot size im MB."
                        },
                        "starttime" : {
                           "pattern" : "\\d{1,2}:\\d{1,2}",
                           "type" : "string",
                           "typetext" : "HH:MM",
                           "description" : "Job Start time."
                        },
                        "dow" : {
                           "format" : "pve-day-of-week-list",
                           "type" : "string",
                           "optional" : 1,
                           "default" : "mon,tue,wed,thu,fri,sat,sun",
                           "description" : "Day of week selection."
                        },
                        "maxfiles" : {
                           "minimum" : 1,
                           "type" : "integer",
                           "optional" : 1,
                           "description" : "Maximal number of backup files per VM."
                        },
                        "vmid" : {
                           "format" : "pve-vmid-list",
                           "type" : "string",
                           "optional" : 1,
                           "description" : "The ID of the VM you want to backup."
                        },
                        "stdexcludes" : {
                           "type" : "boolean",
                           "optional" : 1,
                           "default" : 1,
                           "description" : "Exclude temorary files and logs."
                        },
                        "quiet" : {
                           "type" : "boolean",
                           "optional" : 1,
                           "default" : 0,
                           "description" : "Be quiet."
                        },
                        "script" : {
                           "type" : "string",
                           "optional" : 1,
                           "description" : "Use specified hook script."
                        },
                        "mailto" : {
                           "format" : "string-list",
                           "type" : "string",
                           "optional" : 1,
                           "description" : ""
                        },
                        "ionice" : {
                           "minimum" : 0,
                           "maximum" : 8,
                           "type" : "integer",
                           "optional" : 1,
                           "description" : "Set CFQ ionice priority."
                        },
                        "exclude-path" : {
                           "format" : "string-alist",
                           "type" : "string",
                           "optional" : 1,
                           "description" : "exclude certain files/directories (regex)."
                        },
                        "lockwait" : {
                           "minimum" : 0,
                           "type" : "integer",
                           "optional" : 1,
                           "description" : "Maximal time to wait for the global lock (minutes)."
                        },
                        "compress" : {
                           "enum" : [
                              "0",
                              "1",
                              "gzip",
                              "lzo"
                           ],
                           "type" : "string",
                           "optional" : 1,
                           "default" : "lzo",
                           "description" : "Compress dump file."
                        },
                        "storage" : {
                           "format" : "pve-storage-id",
                           "optional" : 1,
                           "type" : "string",
                           "description" : "Store resulting file to this storage."
                        },
                        "exclude" : {
                           "format" : "pve-vmid-list",
                           "type" : "string",
                           "optional" : 1,
                           "description" : "exclude specified VMs (assumes --all)"
                        }
                     }
                  },
                  "permissions" : {
                     "check" : [
                        "perm",
                        "/",
                        [
                           "Sys.Modify"
                        ]
                     ]
                  },
                  "returns" : {
                     "type" : "null"
                  },
                  "name" : "create_job",
                  "protected" : 1,
                  "method" : "POST",
                  "description" : "Create new vzdump backup job."
               },
               "GET" : {
                  "parameters" : {
                     "additionalProperties" : 0
                  },
                  "permissions" : {
                     "check" : [
                        "perm",
                        "/",
                        [
                           "Sys.Audit"
                        ]
                     ]
                  },
                  "returns" : {
                     "type" : "array",
                     "items" : {
                        "type" : "object",
                        "properties" : {
                           "id" : {
                              "type" : "string"
                           }
                        }
                     },
                     "links" : [
                        {
                           "rel" : "child",
                           "href" : "{id}"
                        }
                     ]
                  },
                  "name" : "index",
                  "method" : "GET",
                  "description" : "List vzdump backup schedule."
               }
            },
            "text" : "backup",
            "children" : [
               {
                  "info" : {
                     "DELETE" : {
                        "parameters" : {
                           "additionalProperties" : 0,
                           "properties" : {
                              "id" : {
                                 "maxLength" : 50,
                                 "type" : "string",
                                 "description" : "The job ID."
                              }
                           }
                        },
                        "permissions" : {
                           "check" : [
                              "perm",
                              "/",
                              [
                                 "Sys.Modify"
                              ]
                           ]
                        },
                        "returns" : {
                           "type" : "null"
                        },
                        "name" : "delete_job",
                        "protected" : 1,
                        "method" : "DELETE",
                        "description" : "Delete vzdump backup job definition."
                     },
                     "PUT" : {
                        "parameters" : {
                           "additionalProperties" : 0,
                           "properties" : {
                              "bwlimit" : {
                                 "minimum" : 0,
                                 "type" : "integer",
                                 "optional" : 1,
                                 "description" : "Limit I/O bandwidth (KBytes per second)."
                              },
                              "remove" : {
                                 "type" : "boolean",
                                 "optional" : 1,
                                 "default" : 1,
                                 "description" : "Remove old backup files if there are more than 'maxfiles' backup files."
                              },
                              "dumpdir" : {
                                 "type" : "string",
                                 "optional" : 1,
                                 "description" : "Store resulting files to specified directory."
                              },
                              "tmpdir" : {
                                 "type" : "string",
                                 "optional" : 1,
                                 "description" : "Store temporary files to specified directory."
                              },
                              "stopwait" : {
                                 "minimum" : 0,
                                 "type" : "integer",
                                 "optional" : 1,
                                 "description" : "Maximal time to wait until a VM is stopped (minutes)."
                              },
                              "mode" : {
                                 "enum" : [
                                    "snapshot",
                                    "suspend",
                                    "stop"
                                 ],
                                 "type" : "string",
                                 "optional" : 1,
                                 "default" : "stop",
                                 "description" : "Backup mode."
                              },
                              "all" : {
                                 "type" : "boolean",
                                 "optional" : 1,
                                 "default" : 0,
                                 "description" : "Backup all known VMs on this host."
                              },
                              "node" : {
                                 "format" : "pve-node",
                                 "optional" : 1,
                                 "type" : "string",
                                 "description" : "Only run if executed on this node."
                              },
                              "size" : {
                                 "minimum" : 500,
                                 "type" : "integer",
                                 "optional" : 1,
                                 "description" : "LVM snapshot size im MB."
                              },
                              "starttime" : {
                                 "pattern" : "\\d{1,2}:\\d{1,2}",
                                 "type" : "string",
                                 "typetext" : "HH:MM",
                                 "description" : "Job Start time."
                              },
                              "dow" : {
                                 "format" : "pve-day-of-week-list",
                                 "type" : "string",
                                 "optional" : 1,
                                 "description" : "Day of week selection."
                              },
                              "id" : {
                                 "maxLength" : 50,
                                 "type" : "string",
                                 "description" : "The job ID."
                              },
                              "maxfiles" : {
                                 "minimum" : 1,
                                 "type" : "integer",
                                 "optional" : 1,
                                 "description" : "Maximal number of backup files per VM."
                              },
                              "vmid" : {
                                 "format" : "pve-vmid-list",
                                 "type" : "string",
                                 "optional" : 1,
                                 "description" : "The ID of the VM you want to backup."
                              },
                              "stdexcludes" : {
                                 "type" : "boolean",
                                 "optional" : 1,
                                 "default" : 1,
                                 "description" : "Exclude temorary files and logs."
                              },
                              "quiet" : {
                                 "type" : "boolean",
                                 "optional" : 1,
                                 "default" : 0,
                                 "description" : "Be quiet."
                              },
                              "script" : {
                                 "type" : "string",
                                 "optional" : 1,
                                 "description" : "Use specified hook script."
                              },
                              "mailto" : {
                                 "format" : "string-list",
                                 "type" : "string",
                                 "optional" : 1,
                                 "description" : ""
                              },
                              "ionice" : {
                                 "minimum" : 0,
                                 "maximum" : 8,
                                 "type" : "integer",
                                 "optional" : 1,
                                 "description" : "Set CFQ ionice priority."
                              },
                              "exclude-path" : {
                                 "format" : "string-alist",
                                 "type" : "string",
                                 "optional" : 1,
                                 "description" : "exclude certain files/directories (regex)."
                              },
                              "lockwait" : {
                                 "minimum" : 0,
                                 "type" : "integer",
                                 "optional" : 1,
                                 "description" : "Maximal time to wait for the global lock (minutes)."
                              },
                              "delete" : {
                                 "format" : "pve-configid-list",
                                 "type" : "string",
                                 "optional" : 1,
                                 "description" : "A list of settings you want to delete."
                              },
                              "compress" : {
                                 "enum" : [
                                    "0",
                                    "1",
                                    "gzip",
                                    "lzo"
                                 ],
                                 "type" : "string",
                                 "optional" : 1,
                                 "default" : "lzo",
                                 "description" : "Compress dump file."
                              },
                              "storage" : {
                                 "format" : "pve-storage-id",
                                 "optional" : 1,
                                 "type" : "string",
                                 "description" : "Store resulting file to this storage."
                              },
                              "exclude" : {
                                 "format" : "pve-vmid-list",
                                 "type" : "string",
                                 "optional" : 1,
                                 "description" : "exclude specified VMs (assumes --all)"
                              }
                           }
                        },
                        "permissions" : {
                           "check" : [
                              "perm",
                              "/",
                              [
                                 "Sys.Modify"
                              ]
                           ]
                        },
                        "returns" : {
                           "type" : "null"
                        },
                        "name" : "update_job",
                        "protected" : 1,
                        "method" : "PUT",
                        "description" : "Update vzdump backup job definition."
                     },
                     "GET" : {
                        "parameters" : {
                           "additionalProperties" : 0,
                           "properties" : {
                              "id" : {
                                 "maxLength" : 50,
                                 "type" : "string",
                                 "description" : "The job ID."
                              }
                           }
                        },
                        "permissions" : {
                           "check" : [
                              "perm",
                              "/",
                              [
                                 "Sys.Audit"
                              ]
                           ]
                        },
                        "returns" : {
                           "type" : "object"
                        },
                        "name" : "read_job",
                        "method" : "GET",
                        "description" : "Read vzdump backup job definition."
                     }
                  },
                  "text" : "{id}",
                  "path" : "/cluster/backup/{id}",
                  "leaf" : 1
               }
            ],
            "path" : "/cluster/backup",
            "leaf" : 0
         },
         {
            "info" : {
               "GET" : {
                  "parameters" : {
                     "additionalProperties" : 0
                  },
                  "permissions" : {
                     "check" : [
                        "perm",
                        "/",
                        [
                           "Sys.Audit"
                        ]
                     ]
                  },
                  "returns" : {
                     "type" : "array",
                     "items" : {
                        "type" : "object",
                        "properties" : {
                           "id" : {
                              "type" : "string"
                           }
                        }
                     },
                     "links" : [
                        {
                           "rel" : "child",
                           "href" : "{id}"
                        }
                     ]
                  },
                  "name" : "index",
                  "method" : "GET",
                  "description" : "Directory index."
               }
            },
            "text" : "ha",
            "children" : [
               {
                  "info" : {
                     "GET" : {
                        "parameters" : {
                           "additionalProperties" : 0
                        },
                        "permissions" : {
                           "check" : [
                              "perm",
                              "/",
                              [
                                 "Sys.Audit"
                              ]
                           ]
                        },
                        "returns" : {
                           "type" : "object",
                           "properties" : {}
                        },
                        "name" : "get_config",
                        "protected" : 1,
                        "method" : "GET",
                        "description" : "Read cluster configuartion (cluster.conf). If you have any uncommitted changes in cluster.conf.new that content is returned instead."
                     }
                  },
                  "text" : "config",
                  "path" : "/cluster/ha/config",
                  "leaf" : 1
               },
               {
                  "info" : {
                     "DELETE" : {
                        "parameters" : {
                           "additionalProperties" : 0
                        },
                        "permissions" : {
                           "check" : [
                              "perm",
                              "/",
                              [
                                 "Sys.Modify"
                              ]
                           ]
                        },
                        "returns" : {
                           "type" : "null"
                        },
                        "name" : "revert_changes",
                        "protected" : 1,
                        "method" : "DELETE",
                        "description" : "Revert pending changes (remove cluster.conf.new)"
                     },
                     "POST" : {
                        "parameters" : {
                           "additionalProperties" : 0
                        },
                        "permissions" : {
                           "check" : [
                              "perm",
                              "/",
                              [
                                 "Sys.Modify"
                              ]
                           ]
                        },
                        "returns" : {
                           "type" : "null"
                        },
                        "name" : "commit_config",
                        "protected" : 1,
                        "method" : "POST",
                        "description" : "Commit cluster configuartion. Pending changes from cluster.conf.new are written to cluster.conf. This triggers a CMan reload on all nodes."
                     },
                     "GET" : {
                        "parameters" : {
                           "additionalProperties" : 0
                        },
                        "permissions" : {
                           "check" : [
                              "perm",
                              "/",
                              [
                                 "Sys.Audit"
                              ]
                           ]
                        },
                        "returns" : {
                           "type" : "string",
                           "optional" : 1
                        },
                        "name" : "get_changes",
                        "protected" : 1,
                        "method" : "GET",
                        "description" : "Get pending changes (unified diff between cluster.conf and cluster.conf.new"
                     }
                  },
                  "text" : "changes",
                  "path" : "/cluster/ha/changes",
                  "leaf" : 1
               },
               {
                  "info" : {
                     "POST" : {
                        "parameters" : {
                           "additionalProperties" : 0,
                           "properties" : {
                              "autostart" : {
                                 "optional" : 1,
                                 "type" : "boolean",
                                 "description" : "Service is started when a quorum forms."
                              },
                              "vmid" : {
                                 "minimum" : 1,
                                 "format" : "pve-vmid",
                                 "type" : "integer",
                                 "description" : "The (unique) ID of the VM."
                              }
                           }
                        },
                        "permissions" : {
                           "check" : [
                              "perm",
                              "/",
                              [
                                 "Sys.Modify"
                              ]
                           ]
                        },
                        "returns" : {
                           "type" : "null"
                        },
                        "name" : "create_group",
                        "protected" : 1,
                        "method" : "POST",
                        "description" : "Create a new resource groups."
                     },
                     "GET" : {
                        "parameters" : {
                           "additionalProperties" : 0
                        },
                        "permissions" : {
                           "check" : [
                              "perm",
                              "/",
                              [
                                 "Sys.Audit"
                              ]
                           ]
                        },
                        "returns" : {
                           "type" : "array",
                           "items" : {
                              "type" : "object",
                              "properties" : {}
                           },
                           "links" : [
                              {
                                 "rel" : "child",
                                 "href" : "{id}"
                              }
                           ]
                        },
                        "name" : "list_groups",
                        "protected" : 1,
                        "method" : "GET",
                        "description" : "List resource groups."
                     }
                  },
                  "text" : "groups",
                  "children" : [
                     {
                        "info" : {
                           "DELETE" : {
                              "parameters" : {
                                 "additionalProperties" : 0,
                                 "properties" : {
                                    "id" : {
                                       "type" : "string",
                                       "description" : "The resource group ID (for example 'pvevm:200')."
                                    }
                                 }
                              },
                              "permissions" : {
                                 "check" : [
                                    "perm",
                                    "/",
                                    [
                                       "Sys.Modify"
                                    ]
                                 ]
                              },
                              "returns" : {
                                 "type" : "null"
                              },
                              "name" : "delete_group",
                              "protected" : 1,
                              "method" : "DELETE",
                              "description" : "Delete resource group."
                           },
                           "GET" : {
                              "parameters" : {
                                 "additionalProperties" : 0,
                                 "properties" : {
                                    "id" : {
                                       "type" : "string",
                                       "description" : "The resource group ID (for example 'pvevm:200')."
                                    }
                                 }
                              },
                              "permissions" : {
                                 "check" : [
                                    "perm",
                                    "/",
                                    [
                                       "Sys.Audit"
                                    ]
                                 ]
                              },
                              "returns" : {
                                 "type" : "object",
                                 "properties" : {}
                              },
                              "name" : "read_group",
                              "protected" : 1,
                              "method" : "GET",
                              "description" : "List resource groups."
                           },
                           "PUT" : {
                              "parameters" : {
                                 "additionalProperties" : 0,
                                 "properties" : {
                                    "autostart" : {
                                       "optional" : 1,
                                       "type" : "boolean",
                                       "description" : "Service is started when a quorum forms."
                                    },
                                    "id" : {
                                       "type" : "string",
                                       "description" : "The resource group ID (for example 'pvevm:200')."
                                    }
                                 }
                              },
                              "permissions" : {
                                 "check" : [
                                    "perm",
                                    "/",
                                    [
                                       "Sys.Modify"
                                    ]
                                 ]
                              },
                              "returns" : {
                                 "type" : "null"
                              },
                              "name" : "update_group",
                              "protected" : 1,
                              "method" : "PUT",
                              "description" : "Update resource groups settings."
                           }
                        },
                        "text" : "{id}",
                        "path" : "/cluster/ha/groups/{id}",
                        "leaf" : 1
                     }
                  ],
                  "path" : "/cluster/ha/groups",
                  "leaf" : 0
               }
            ],
            "path" : "/cluster/ha",
            "leaf" : 0
         },
         {
            "info" : {
               "GET" : {
                  "parameters" : {
                     "additionalProperties" : 0,
                     "properties" : {
                        "max" : {
                           "minimum" : 1,
                           "type" : "integer",
                           "optional" : 1,
                           "description" : "Maximum number of entries."
                        }
                     }
                  },
                  "permissions" : {
                     "user" : "all"
                  },
                  "returns" : {
                     "type" : "array",
                     "items" : {
                        "type" : "object",
                        "properties" : {}
                     }
                  },
                  "name" : "log",
                  "method" : "GET",
                  "description" : "Read cluster log"
               }
            },
            "text" : "log",
            "path" : "/cluster/log",
            "leaf" : 1
         },
         {
            "info" : {
               "GET" : {
                  "parameters" : {
                     "additionalProperties" : 0,
                     "properties" : {
                        "type" : {
                           "enum" : [
                              "vm",
                              "storage",
                              "node"
                           ],
                           "type" : "string",
                           "optional" : 1
                        }
                     }
                  },
                  "permissions" : {
                     "user" : "all"
                  },
                  "returns" : {
                     "type" : "array",
                     "items" : {
                        "type" : "object",
                        "properties" : {}
                     }
                  },
                  "name" : "resources",
                  "method" : "GET",
                  "description" : "Resources index (cluster wide)."
               }
            },
            "text" : "resources",
            "path" : "/cluster/resources",
            "leaf" : 1
         },
         {
            "info" : {
               "GET" : {
                  "parameters" : {
                     "additionalProperties" : 0
                  },
                  "permissions" : {
                     "user" : "all"
                  },
                  "returns" : {
                     "type" : "array",
                     "items" : {
                        "type" : "object",
                        "properties" : {
                           "upid" : {
                              "type" : "string"
                           }
                        }
                     }
                  },
                  "name" : "tasks",
                  "method" : "GET",
                  "description" : "List recent tasks (cluster wide)."
               }
            },
            "text" : "tasks",
            "path" : "/cluster/tasks",
            "leaf" : 1
         },
         {
            "info" : {
               "PUT" : {
                  "parameters" : {
                     "additionalProperties" : 0,
                     "properties" : {
                        "language" : {
                           "enum" : [
                              "en",
                              "de"
                           ],
                           "optional" : 1,
                           "type" : "string",
                           "description" : "Default GUI language."
                        },
                        "delete" : {
                           "format" : "pve-configid-list",
                           "type" : "string",
                           "optional" : 1,
                           "description" : "A list of settings you want to delete."
                        },
                        "http_proxy" : {
                           "pattern" : "http://.*",
                           "optional" : 1,
                           "type" : "string",
                           "description" : "Specify external http proxy which is used for downloads (example: 'http://username:password@host:port/')"
                        },
                        "keyboard" : {
                           "enum" : [
                              "pt",
                              "tr",
                              "ja",
                              "es",
                              "no",
                              "is",
                              "fr-ca",
                              "fr",
                              "pt-br",
                              "da",
                              "fr-ch",
                              "sl",
                              "de-ch",
                              "en-gb",
                              "it",
                              "en-us",
                              "fr-be",
                              "hu",
                              "pl",
                              "nl",
                              "mk",
                              "fi",
                              "lt",
                              "sv",
                              "de"
                           ],
                           "optional" : 1,
                           "type" : "string",
                           "description" : "Default keybord layout for vnc server."
                        }
                     }
                  },
                  "permissions" : {
                     "check" : [
                        "perm",
                        "/",
                        [
                           "Sys.Modify"
                        ]
                     ]
                  },
                  "returns" : {
                     "type" : "null"
                  },
                  "name" : "set_options",
                  "protected" : 1,
                  "method" : "PUT",
                  "description" : "Set datacenter options."
               },
               "GET" : {
                  "parameters" : {
                     "additionalProperties" : 0
                  },
                  "permissions" : {
                     "check" : [
                        "perm",
                        "/",
                        [
                           "Sys.Audit"
                        ]
                     ]
                  },
                  "returns" : {
                     "type" : "object",
                     "properties" : {}
                  },
                  "name" : "get_options",
                  "method" : "GET",
                  "description" : "Get datacenter options."
               }
            },
            "text" : "options",
            "path" : "/cluster/options",
            "leaf" : 1
         },
         {
            "info" : {
               "GET" : {
                  "parameters" : {
                     "additionalProperties" : 0
                  },
                  "permissions" : {
                     "check" : [
                        "perm",
                        "/",
                        [
                           "Sys.Audit"
                        ]
                     ]
                  },
                  "returns" : {
                     "type" : "array",
                     "items" : {
                        "type" : "object",
                        "properties" : {
                           "type" : {
                              "type" : "string"
                           }
                        }
                     }
                  },
                  "name" : "get_status",
                  "protected" : 1,
                  "method" : "GET",
                  "description" : "Get cluster status informations."
               }
            },
            "text" : "status",
            "path" : "/cluster/status",
            "leaf" : 1
         },
         {
            "info" : {
               "GET" : {
                  "parameters" : {
                     "additionalProperties" : 0,
                     "properties" : {
                        "vmid" : {
                           "minimum" : 1,
                           "format" : "pve-vmid",
                           "optional" : 1,
                           "type" : "integer",
                           "description" : "The (unique) ID of the VM."
                        }
                     }
                  },
                  "permissions" : {
                     "user" : "all"
                  },
                  "returns" : {
                     "type" : "integer",
                     "description" : "The next free VMID."
                  },
                  "name" : "nextid",
                  "method" : "GET",
                  "description" : "Get next free VMID. If you pass an VMID it will raise an error if the ID is already used."
               }
            },
            "text" : "nextid",
            "path" : "/cluster/nextid",
            "leaf" : 1
         }
      ],
      "path" : "/cluster",
      "leaf" : 0
   },
   {
      "info" : {
         "GET" : {
            "parameters" : {
               "additionalProperties" : 0
            },
            "permissions" : {
               "user" : "all"
            },
            "returns" : {
               "type" : "array",
               "items" : {
                  "type" : "object",
                  "properties" : {}
               },
               "links" : [
                  {
                     "rel" : "child",
                     "href" : "{node}"
                  }
               ]
            },
            "name" : "index",
            "method" : "GET",
            "description" : "Cluster node index."
         }
      },
      "text" : "nodes",
      "children" : [
         {
            "info" : {
               "GET" : {
                  "parameters" : {
                     "additionalProperties" : 0,
                     "properties" : {
                        "node" : {
                           "format" : "pve-node",
                           "type" : "string",
                           "description" : "The cluster node name."
                        }
                     }
                  },
                  "permissions" : {
                     "user" : "all"
                  },
                  "returns" : {
                     "type" : "array",
                     "items" : {
                        "type" : "object",
                        "properties" : {}
                     },
                     "links" : [
                        {
                           "rel" : "child",
                           "href" : "{name}"
                        }
                     ]
                  },
                  "name" : "index",
                  "method" : "GET",
                  "description" : "Node index."
               }
            },
            "text" : "{node}",
            "children" : [
               {
                  "info" : {
                     "POST" : {
                        "permissions" : {
                           "user" : "all",
                           "description" : "You need 'VM.Allocate' permissions on /vms/{vmid} or on the VM pool /pool/{pool}. For restore (option 'archive'), it is enough if the user has 'VM.Backup' permission and the VM already exists. If you create disks you need 'Datastore.AllocateSpace' on any used storage."
                        },
                        "returns" : {
                           "type" : "string"
                        },
                        "name" : "create_vm",
                        "protected" : 1,
                        "description" : "Create or restore a virtual machine.",
                        "parameters" : {
                           "additionalProperties" : 0,
                           "properties" : {
                              "shares" : {
                                 "minimum" : 0,
                                 "maximum" : 50000,
                                 "optional" : 1,
                                 "type" : "integer",
                                 "default" : 1000,
                                 "description" : "Amount of memory shares for auto-ballooning. The larger the number is, the more memory this VM gets. Number is relative to weights of all other running VMs. Using zero disables auto-ballooning"
                              },
                              "hostpci[n]" : {
                                 "format" : "pve-qm-hostpci",
                                 "optional" : 1,
                                 "type" : "string",
                                 "typetext" : "HOSTPCIDEVICE",
                                 "description" : "Map host pci devices. HOSTPCIDEVICE syntax is:\n\n'bus:dev.func' (hexadecimal numbers)\n\nYou can us the 'lspci' command to list existing pci devices.\n\nNote: This option allows direct access to host hardware. So it is no longer possible to migrate such machines - use with special care.\n\nExperimental: user reported problems with this option.\n"
                              },
                              "lock" : {
                                 "enum" : [
                                    "migrate",
                                    "backup",
                                    "snapshot",
                                    "rollback"
                                 ],
                                 "optional" : 1,
                                 "type" : "string",
                                 "description" : "Lock/unlock the VM."
                              },
                              "scsihw" : {
                                 "enum" : [
                                    "lsi",
                                    "virtio-scsi-pci",
                                    "megasas"
                                 ],
                                 "optional" : 1,
                                 "type" : "string",
                                 "default" : "lsi",
                                 "description" : "scsi controller model"
                              },
                              "smp" : {
                                 "minimum" : 1,
                                 "optional" : 1,
                                 "type" : "integer",
                                 "default" : 1,
                                 "description" : "The number of CPUs. Please use option -sockets instead."
                              },
                              "startdate" : {
                                 "pattern" : "(now|\\d{4}-\\d{1,2}-\\d{1,2}(T\\d{1,2}:\\d{1,2}:\\d{1,2})?)",
                                 "optional" : 1,
                                 "type" : "string",
                                 "typetext" : "(now | YYYY-MM-DD | YYYY-MM-DDTHH:MM:SS)",
                                 "default" : "now",
                                 "description" : "Set the initial date of the real time clock. Valid format for date are: 'now' or '2006-06-17T16:01:21' or '2006-06-17'."
                              },
                              "scsi[n]" : {
                                 "format" : "pve-qm-drive",
                                 "optional" : 1,
                                 "type" : "string",
                                 "typetext" : "[volume=]volume,] [,media=cdrom|disk] [,cyls=c,heads=h,secs=s[,trans=t]] [,snapshot=on|off] [,cache=none|writethrough|writeback|unsafe|directsync] [,format=f] [,backup=yes|no] [,rerror=ignore|report|stop] [,werror=enospc|ignore|report|stop] [,aio=native|threads]",
                                 "description" : "Use volume as SCSI hard disk or CD-ROM (n is 0 to 13)."
                              },
                              "ostype" : {
                                 "enum" : [
                                    "other",
                                    "wxp",
                                    "w2k",
                                    "w2k3",
                                    "w2k8",
                                    "wvista",
                                    "win7",
                                    "win8",
                                    "l24",
                                    "l26"
                                 ],
                                 "optional" : 1,
                                 "type" : "string",
                                 "description" : "Used to enable special optimization/features for specific\noperating systems:\n\nother  => unspecified OS\nwxp    => Microsoft Windows XP\nw2k    => Microsoft Windows 2000\nw2k3   => Microsoft Windows 2003\nw2k8   => Microsoft Windows 2008\nwvista => Microsoft Windows Vista\nwin7   => Microsoft Windows 7\nwin8   => Microsoft Windows 8/2012\nl24    => Linux 2.4 Kernel\nl26    => Linux 2.6/3.X Kernel\n\nother|l24|l26                       ... no special behaviour\nwxp|w2k|w2k3|w2k8|wvista|win7|win8  ... use --localtime switch\n"
                              },
                              "onboot" : {
                                 "optional" : 1,
                                 "type" : "boolean",
                                 "default" : 0,
                                 "description" : "Specifies whether a VM will be started during system bootup."
                              },
                              "balloon" : {
                                 "minimum" : 0,
                                 "optional" : 1,
                                 "type" : "integer",
                                 "description" : "Amount of target RAM for the VM in MB. Using zero disables the ballon driver."
                              },
                              "tablet" : {
                                 "optional" : 1,
                                 "type" : "boolean",
                                 "default" : 1,
                                 "description" : "Enable/disable the usb tablet device. This device is usually needed to allow absolute mouse positioning. Else the mouse runs out of sync with normal vnc clients. If you're running lots of console-only guests on one host, you may consider disabling this to save some context switches."
                              },
                              "localtime" : {
                                 "optional" : 1,
                                 "type" : "boolean",
                                 "description" : "Set the real time clock to local time. This is enabled by default if ostype indicates a Microsoft OS."
                              },
                              "unique" : {
                                 "requires" : "archive",
                                 "optional" : 1,
                                 "type" : "boolean",
                                 "description" : "Assign a unique random ethernet address."
                              },
                              "freeze" : {
                                 "optional" : 1,
                                 "type" : "boolean",
                                 "description" : "Freeze CPU at startup (use 'c' monitor command to start execution)."
                              },
                              "cpu" : {
                                 "enum" : [
                                    "486",
                                    "athlon",
                                    "pentium",
                                    "pentium2",
                                    "pentium3",
                                    "coreduo",
                                    "core2duo",
                                    "kvm32",
                                    "kvm64",
                                    "qemu32",
                                    "qemu64",
                                    "phenom",
                                    "Conroe",
                                    "Penryn",
                                    "Nehalem",
                                    "Westmere",
                                    "SandyBridge",
                                    "Haswell",
                                    "Opteron_G1",
                                    "Opteron_G2",
                                    "Opteron_G3",
                                    "Opteron_G4",
                                    "Opteron_G5",
                                    "host"
                                 ],
                                 "optional" : 1,
                                 "type" : "string",
                                 "default" : "kvm64",
                                 "description" : "Emulated CPU type."
                              },
                              "template" : {
                                 "optional" : 1,
                                 "type" : "boolean",
                                 "default" : 0,
                                 "description" : "Enable/disable Template."
                              },
                              "startup" : {
                                 "format" : "pve-qm-startup",
                                 "optional" : 1,
                                 "type" : "string",
                                 "typetext" : "[[order=]\\d+] [,up=\\d+] [,down=\\d+] ",
                                 "description" : "Startup and shutdown behavior. Order is a non-negative number defining the general startup order. Shutdown in done with reverse ordering. Additionally you can set the 'up' or 'down' delay in seconds, which specifies a delay to wait before the next VM is started or stopped."
                              },
                              "cdrom" : {
                                 "format" : "pve-qm-drive",
                                 "optional" : 1,
                                 "type" : "string",
                                 "typetext" : "volume",
                                 "description" : "This is an alias for option -ide2"
                              },
                              "name" : {
                                 "format" : "dns-name",
                                 "optional" : 1,
                                 "type" : "string",
                                 "description" : "Set a name for the VM. Only used on the configuration web interface."
                              },
                              "bootdisk" : {
                                 "pattern" : "(ide|sata|scsi|virtio)\\d+",
                                 "format" : "pve-qm-bootdisk",
                                 "optional" : 1,
                                 "type" : "string",
                                 "description" : "Enable booting from specified disk."
                              },
                              "description" : {
                                 "optional" : 1,
                                 "type" : "string",
                                 "description" : "Description for the VM. Only used on the configuration web interface. This is saved as comment inside the configuration file."
                              },
                              "memory" : {
                                 "minimum" : 16,
                                 "optional" : 1,
                                 "type" : "integer",
                                 "default" : 512,
                                 "description" : "Amount of RAM for the VM in MB. This is the maximum available memory when you use the balloon device."
                              },
                              "virtio[n]" : {
                                 "format" : "pve-qm-drive",
                                 "optional" : 1,
                                 "type" : "string",
                                 "typetext" : "[volume=]volume,] [,media=cdrom|disk] [,cyls=c,heads=h,secs=s[,trans=t]] [,snapshot=on|off] [,cache=none|writethrough|writeback|unsafe|directsync] [,format=f] [,backup=yes|no] [,rerror=ignore|report|stop] [,werror=enospc|ignore|report|stop] [,aio=native|threads]",
                                 "description" : "Use volume as VIRTIO hard disk (n is 0 to 15)."
                              },
                              "boot" : {
                                 "pattern" : "[acdn]{1,4}",
                                 "optional" : 1,
                                 "type" : "string",
                                 "default" : "cdn",
                                 "description" : "Boot on floppy (a), hard disk (c), CD-ROM (d), or network (n)."
                              },
                              "net[n]" : {
                                 "format" : "pve-qm-net",
                                 "optional" : 1,
                                 "type" : "string",
                                 "typetext" : "MODEL=XX:XX:XX:XX:XX:XX [,bridge=<dev>][,rate=<mbps>][,tag=<vlanid>]",
                                 "description" : "Specify network devices.\n\nMODEL is one of: e1000 i82551 i82557b i82559er ne2k_isa ne2k_pci pcnet rtl8139 virtio\n\nXX:XX:XX:XX:XX:XX should be an unique MAC address. This is\nautomatically generated if not specified.\n\nThe bridge parameter can be used to automatically add the interface to a bridge device. The Proxmox VE standard bridge is called 'vmbr0'.\n\nOption 'rate' is used to limit traffic bandwidth from and to this interface. It is specified as floating point number, unit is 'Megabytes per second'.\n\nIf you specify no bridge, we create a kvm 'user' (NATed) network device, which provides DHCP and DNS services. The following addresses are used:\n\n10.0.2.2   Gateway\n10.0.2.3   DNS Server\n10.0.2.4   SMB Server\n\nThe DHCP server assign addresses to the guest starting from 10.0.2.15.\n\n"
                              },
                              "cpuunits" : {
                                 "minimum" : 0,
                                 "maximum" : 500000,
                                 "optional" : 1,
                                 "type" : "integer",
                                 "default" : 1000,
                                 "description" : "CPU weight for a VM. Argument is used in the kernel fair scheduler. The larger the number is, the more CPU time this VM gets. Number is relative to weights of all the other running VMs.\n\nNOTE: You can disable fair-scheduler configuration by setting this to 0."
                              },
                              "tdf" : {
                                 "optional" : 1,
                                 "type" : "boolean",
                                 "default" : 0,
                                 "description" : "Enable/disable time drift fix."
                              },
                              "serial[n]" : {
                                 "pattern" : "/dev/ttyS\\d+",
                                 "optional" : 1,
                                 "type" : "string",
                                 "description" : "Map host serial devices (n is 0 to 3).\n\nNote: This option allows direct access to host hardware. So it is no longer possible to migrate such machines - use with special care.\n\nExperimental: user reported problems with this option.\n"
                              },
                              "autostart" : {
                                 "optional" : 1,
                                 "type" : "boolean",
                                 "default" : 0,
                                 "description" : "Automatic restart after crash (currently ignored)."
                              },
                              "args" : {
                                 "optional" : 1,
                                 "type" : "string",
                                 "description" : "Note: this option is for experts only. It allows you to pass arbitrary arguments to kvm, for example:\n\nargs: -no-reboot -no-hpet\n"
                              },
                              "kvm" : {
                                 "optional" : 1,
                                 "type" : "boolean",
                                 "default" : 1,
                                 "description" : "Enable/disable KVM hardware virtualization."
                              },
                              "acpi" : {
                                 "optional" : 1,
                                 "type" : "boolean",
                                 "default" : 1,
                                 "description" : "Enable/disable ACPI."
                              },
                              "unused[n]" : {
                                 "format" : "pve-volume-id",
                                 "optional" : 1,
                                 "type" : "string",
                                 "description" : "Reference to unused volumes."
                              },
                              "node" : {
                                 "format" : "pve-node",
                                 "type" : "string",
                                 "description" : "The cluster node name."
                              },
                              "cpulimit" : {
                                 "minimum" : 0,
                                 "optional" : 1,
                                 "type" : "integer",
                                 "default" : 0,
                                 "description" : "Limit of CPU usage in per cent. Note if the computer has 2 CPUs, it has total of 200% CPU time. Value '0' indicates no CPU limit.\n\nNOTE: This option is currently ignored."
                              },
                              "sockets" : {
                                 "minimum" : 1,
                                 "optional" : 1,
                                 "type" : "integer",
                                 "default" : 1,
                                 "description" : "The number of CPU sockets."
                              },
                              "pool" : {
                                 "format" : "pve-poolid",
                                 "optional" : 1,
                                 "type" : "string",
                                 "description" : "Add the VM to the specified pool."
                              },
                              "parallel[n]" : {
                                 "pattern" : "/dev/parport\\d+",
                                 "optional" : 1,
                                 "type" : "string",
                                 "description" : "Map host parallel devices (n is 0 to 2).\n\nNote: This option allows direct access to host hardware. So it is no longer possible to migrate such machines - use with special care.\n\nExperimental: user reported problems with this option.\n"
                              },
                              "vmid" : {
                                 "minimum" : 1,
                                 "format" : "pve-vmid",
                                 "type" : "integer",
                                 "description" : "The (unique) ID of the VM."
                              },
                              "keyboard" : {
                                 "enum" : [
                                    "pt",
                                    "tr",
                                    "ja",
                                    "es",
                                    "no",
                                    "is",
                                    "fr-ca",
                                    "fr",
                                    "pt-br",
                                    "da",
                                    "fr-ch",
                                    "sl",
                                    "de-ch",
                                    "en-gb",
                                    "it",
                                    "en-us",
                                    "fr-be",
                                    "hu",
                                    "pl",
                                    "nl",
                                    "mk",
                                    "fi",
                                    "lt",
                                    "sv",
                                    "de"
                                 ],
                                 "optional" : 1,
                                 "type" : "string",
                                 "default" : "en-us",
                                 "description" : "Keybord layout for vnc server. Default is read from the datacenter configuration file."
                              },
                              "reboot" : {
                                 "optional" : 1,
                                 "type" : "boolean",
                                 "default" : 1,
                                 "description" : "Allow reboot. If set to '0' the VM exit on reboot."
                              },
                              "archive" : {
                                 "maxLength" : 255,
                                 "type" : "string",
                                 "optional" : 1,
                                 "description" : "The backup file."
                              },
                              "hotplug" : {
                                 "optional" : 1,
                                 "type" : "boolean",
                                 "default" : 0,
                                 "description" : "Allow hotplug for disk and network device"
                              },
                              "migrate_downtime" : {
                                 "minimum" : 0,
                                 "optional" : 1,
                                 "type" : "number",
                                 "default" : 0.1,
                                 "description" : "Set maximum tolerated downtime (in seconds) for migrations."
                              },
                              "force" : {
                                 "requires" : "archive",
                                 "optional" : 1,
                                 "type" : "boolean",
                                 "description" : "Allow to overwrite existing VM."
                              },
                              "usb[n]" : {
                                 "format" : "pve-qm-usb-device",
                                 "optional" : 1,
                                 "type" : "string",
                                 "typetext" : "host=HOSTUSBDEVICE",
                                 "description" : "Configure an USB device (n is 0 to 4). This can be used to\npass-through usb devices to the guest. HOSTUSBDEVICE syntax is:\n\n'bus-port(.port)*' (decimal numbers) or\n'vendor_id:product_id' (hexadeciaml numbers)\n\nYou can use the 'lsusb -t' command to list existing usb devices.\n\nNote: This option allows direct access to host hardware. So it is no longer possible to migrate such machines - use with special care.\n\n"
                              },
                              "cores" : {
                                 "minimum" : 1,
                                 "optional" : 1,
                                 "type" : "integer",
                                 "default" : 1,
                                 "description" : "The number of cores per socket."
                              },
                              "sata[n]" : {
                                 "format" : "pve-qm-drive",
                                 "optional" : 1,
                                 "type" : "string",
                                 "typetext" : "[volume=]volume,] [,media=cdrom|disk] [,cyls=c,heads=h,secs=s[,trans=t]] [,snapshot=on|off] [,cache=none|writethrough|writeback|unsafe|directsync] [,format=f] [,backup=yes|no] [,rerror=ignore|report|stop] [,werror=enospc|ignore|report|stop] [,aio=native|threads]",
                                 "description" : "Use volume as SATA hard disk or CD-ROM (n is 0 to 5)."
                              },
                              "watchdog" : {
                                 "format" : "pve-qm-watchdog",
                                 "optional" : 1,
                                 "type" : "string",
                                 "typetext" : "[[model=]i6300esb|ib700] [,[action=]reset|shutdown|poweroff|pause|debug|none]",
                                 "description" : "Create a virtual hardware watchdog device.  Once enabled (by a guest action), the watchdog must be periodically polled by an agent inside the guest or else the guest will be restarted (or execute the action specified)"
                              },
                              "vga" : {
                                 "enum" : [
                                    "std",
                                    "cirrus",
                                    "vmware"
                                 ],
                                 "optional" : 1,
                                 "type" : "string",
                                 "description" : "Select VGA type. If you want to use high resolution modes (>= 1280x1024x16) then you should use option 'std' or 'vmware'. Default is 'std' for win8/win7/w2k8, and 'cirrur' for other OS types"
                              },
                              "agent" : {
                                 "optional" : 1,
                                 "type" : "boolean",
                                 "default" : 0,
                                 "description" : "Enable/disable Qemu GuestAgent."
                              },
                              "ide[n]" : {
                                 "format" : "pve-qm-drive",
                                 "optional" : 1,
                                 "type" : "string",
                                 "typetext" : "[volume=]volume,] [,media=cdrom|disk] [,cyls=c,heads=h,secs=s[,trans=t]] [,snapshot=on|off] [,cache=none|writethrough|writeback|unsafe|directsync] [,format=f] [,backup=yes|no] [,rerror=ignore|report|stop] [,werror=enospc|ignore|report|stop] [,aio=native|threads]",
                                 "description" : "Use volume as IDE hard disk or CD-ROM (n is 0 to 3)."
                              },
                              "migrate_speed" : {
                                 "minimum" : 0,
                                 "optional" : 1,
                                 "type" : "integer",
                                 "default" : 0,
                                 "description" : "Set maximum speed (in MB/s) for migrations. Value 0 is no limit."
                              },
                              "storage" : {
                                 "format" : "pve-storage-id",
                                 "optional" : 1,
                                 "type" : "string",
                                 "description" : "Default storage."
                              }
                           }
                        },
                        "method" : "POST",
                        "proxyto" : "node"
                     },
                     "GET" : {
                        "permissions" : {
                           "user" : "all",
                           "description" : "Only list VMs where you have VM.Audit permissons on /vms/<vmid>."
                        },
                        "returns" : {
                           "type" : "array",
                           "items" : {
                              "type" : "object",
                              "properties" : {}
                           },
                           "links" : [
                              {
                                 "rel" : "child",
                                 "href" : "{vmid}"
                              }
                           ]
                        },
                        "name" : "vmlist",
                        "protected" : 1,
                        "description" : "Virtual machine index (per node).",
                        "parameters" : {
                           "additionalProperties" : 0,
                           "properties" : {
                              "node" : {
                                 "format" : "pve-node",
                                 "type" : "string",
                                 "description" : "The cluster node name."
                              }
                           }
                        },
                        "method" : "GET",
                        "proxyto" : "node"
                     }
                  },
                  "text" : "qemu",
                  "children" : [
                     {
                        "info" : {
                           "DELETE" : {
                              "permissions" : {
                                 "check" : [
                                    "perm",
                                    "/vms/{vmid}",
                                    [
                                       "VM.Allocate"
                                    ]
                                 ]
                              },
                              "returns" : {
                                 "type" : "string"
                              },
                              "name" : "destroy_vm",
                              "protected" : 1,
                              "description" : "Destroy the vm (also delete all used/owned volumes).",
                              "parameters" : {
                                 "additionalProperties" : 0,
                                 "properties" : {
                                    "node" : {
                                       "format" : "pve-node",
                                       "type" : "string",
                                       "description" : "The cluster node name."
                                    },
                                    "vmid" : {
                                       "minimum" : 1,
                                       "format" : "pve-vmid",
                                       "type" : "integer",
                                       "description" : "The (unique) ID of the VM."
                                    },
                                    "skiplock" : {
                                       "optional" : 1,
                                       "type" : "boolean",
                                       "description" : "Ignore locks - only root is allowed to use this option."
                                    }
                                 }
                              },
                              "method" : "DELETE",
                              "proxyto" : "node"
                           },
                           "GET" : {
                              "parameters" : {
                                 "additionalProperties" : 0,
                                 "properties" : {
                                    "node" : {
                                       "format" : "pve-node",
                                       "type" : "string",
                                       "description" : "The cluster node name."
                                    },
                                    "vmid" : {
                                       "minimum" : 1,
                                       "format" : "pve-vmid",
                                       "type" : "integer",
                                       "description" : "The (unique) ID of the VM."
                                    }
                                 }
                              },
                              "permissions" : {
                                 "user" : "all"
                              },
                              "returns" : {
                                 "type" : "array",
                                 "items" : {
                                    "type" : "object",
                                    "properties" : {
                                       "subdir" : {
                                          "type" : "string"
                                       }
                                    }
                                 },
                                 "links" : [
                                    {
                                       "rel" : "child",
                                       "href" : "{subdir}"
                                    }
                                 ]
                              },
                              "name" : "vmdiridx",
                              "proxyto" : "node",
                              "method" : "GET",
                              "description" : "Directory index"
                           }
                        },
                        "text" : "{vmid}",
                        "children" : [
                           {
                              "info" : {
                                 "GET" : {
                                    "parameters" : {
                                       "additionalProperties" : 0,
                                       "properties" : {
                                          "timeframe" : {
                                             "enum" : [
                                                "hour",
                                                "day",
                                                "week",
                                                "month",
                                                "year"
                                             ],
                                             "type" : "string",
                                             "description" : "Specify the time frame you are interested in."
                                          },
                                          "cf" : {
                                             "enum" : [
                                                "AVERAGE",
                                                "MAX"
                                             ],
                                             "type" : "string",
                                             "optional" : 1,
                                             "description" : "The RRD consolidation function"
                                          },
                                          "node" : {
                                             "format" : "pve-node",
                                             "type" : "string",
                                             "description" : "The cluster node name."
                                          },
                                          "vmid" : {
                                             "minimum" : 1,
                                             "format" : "pve-vmid",
                                             "type" : "integer",
                                             "description" : "The (unique) ID of the VM."
                                          },
                                          "ds" : {
                                             "format" : "pve-configid-list",
                                             "type" : "string",
                                             "description" : "The list of datasources you want to display."
                                          }
                                       }
                                    },
                                    "permissions" : {
                                       "check" : [
                                          "perm",
                                          "/vms/{vmid}",
                                          [
                                             "VM.Audit"
                                          ]
                                       ]
                                    },
                                    "returns" : {
                                       "type" : "object",
                                       "properties" : {
                                          "filename" : {
                                             "type" : "string"
                                          }
                                       }
                                    },
                                    "name" : "rrd",
                                    "protected" : 1,
                                    "method" : "GET",
                                    "description" : "Read VM RRD statistics (returns PNG)"
                                 }
                              },
                              "text" : "rrd",
                              "path" : "/nodes/{node}/qemu/{vmid}/rrd",
                              "leaf" : 1
                           },
                           {
                              "info" : {
                                 "GET" : {
                                    "parameters" : {
                                       "additionalProperties" : 0,
                                       "properties" : {
                                          "timeframe" : {
                                             "enum" : [
                                                "hour",
                                                "day",
                                                "week",
                                                "month",
                                                "year"
                                             ],
                                             "type" : "string",
                                             "description" : "Specify the time frame you are interested in."
                                          },
                                          "cf" : {
                                             "enum" : [
                                                "AVERAGE",
                                                "MAX"
                                             ],
                                             "type" : "string",
                                             "optional" : 1,
                                             "description" : "The RRD consolidation function"
                                          },
                                          "node" : {
                                             "format" : "pve-node",
                                             "type" : "string",
                                             "description" : "The cluster node name."
                                          },
                                          "vmid" : {
                                             "minimum" : 1,
                                             "format" : "pve-vmid",
                                             "type" : "integer",
                                             "description" : "The (unique) ID of the VM."
                                          }
                                       }
                                    },
                                    "permissions" : {
                                       "check" : [
                                          "perm",
                                          "/vms/{vmid}",
                                          [
                                             "VM.Audit"
                                          ]
                                       ]
                                    },
                                    "returns" : {
                                       "type" : "array",
                                       "items" : {
                                          "type" : "object",
                                          "properties" : {}
                                       }
                                    },
                                    "name" : "rrddata",
                                    "protected" : 1,
                                    "method" : "GET",
                                    "description" : "Read VM RRD statistics"
                                 }
                              },
                              "text" : "rrddata",
                              "path" : "/nodes/{node}/qemu/{vmid}/rrddata",
                              "leaf" : 1
                           },
                           {
                              "info" : {
                                 "PUT" : {
                                    "permissions" : {
                                       "check" : [
                                          "perm",
                                          "/vms/{vmid}",
                                          [
                                             "VM.Config.Disk",
                                             "VM.Config.CDROM",
                                             "VM.Config.CPU",
                                             "VM.Config.Memory",
                                             "VM.Config.Network",
                                             "VM.Config.HWType",
                                             "VM.Config.Options"
                                          ],
                                          "any",
                                          1
                                       ]
                                    },
                                    "returns" : {
                                       "type" : "null"
                                    },
                                    "name" : "update_vm",
                                    "protected" : 1,
                                    "description" : "Set virtual machine options.",
                                    "parameters" : {
                                       "additionalProperties" : 0,
                                       "properties" : {
                                          "shares" : {
                                             "minimum" : 0,
                                             "maximum" : 50000,
                                             "optional" : 1,
                                             "type" : "integer",
                                             "default" : 1000,
                                             "description" : "Amount of memory shares for auto-ballooning. The larger the number is, the more memory this VM gets. Number is relative to weights of all other running VMs. Using zero disables auto-ballooning"
                                          },
                                          "hostpci[n]" : {
                                             "format" : "pve-qm-hostpci",
                                             "optional" : 1,
                                             "type" : "string",
                                             "typetext" : "HOSTPCIDEVICE",
                                             "description" : "Map host pci devices. HOSTPCIDEVICE syntax is:\n\n'bus:dev.func' (hexadecimal numbers)\n\nYou can us the 'lspci' command to list existing pci devices.\n\nNote: This option allows direct access to host hardware. So it is no longer possible to migrate such machines - use with special care.\n\nExperimental: user reported problems with this option.\n"
                                          },
                                          "lock" : {
                                             "enum" : [
                                                "migrate",
                                                "backup",
                                                "snapshot",
                                                "rollback"
                                             ],
                                             "optional" : 1,
                                             "type" : "string",
                                             "description" : "Lock/unlock the VM."
                                          },
                                          "scsihw" : {
                                             "enum" : [
                                                "lsi",
                                                "virtio-scsi-pci",
                                                "megasas"
                                             ],
                                             "optional" : 1,
                                             "type" : "string",
                                             "default" : "lsi",
                                             "description" : "scsi controller model"
                                          },
                                          "smp" : {
                                             "minimum" : 1,
                                             "optional" : 1,
                                             "type" : "integer",
                                             "default" : 1,
                                             "description" : "The number of CPUs. Please use option -sockets instead."
                                          },
                                          "startdate" : {
                                             "pattern" : "(now|\\d{4}-\\d{1,2}-\\d{1,2}(T\\d{1,2}:\\d{1,2}:\\d{1,2})?)",
                                             "optional" : 1,
                                             "type" : "string",
                                             "typetext" : "(now | YYYY-MM-DD | YYYY-MM-DDTHH:MM:SS)",
                                             "default" : "now",
                                             "description" : "Set the initial date of the real time clock. Valid format for date are: 'now' or '2006-06-17T16:01:21' or '2006-06-17'."
                                          },
                                          "scsi[n]" : {
                                             "format" : "pve-qm-drive",
                                             "optional" : 1,
                                             "type" : "string",
                                             "typetext" : "[volume=]volume,] [,media=cdrom|disk] [,cyls=c,heads=h,secs=s[,trans=t]] [,snapshot=on|off] [,cache=none|writethrough|writeback|unsafe|directsync] [,format=f] [,backup=yes|no] [,rerror=ignore|report|stop] [,werror=enospc|ignore|report|stop] [,aio=native|threads]",
                                             "description" : "Use volume as SCSI hard disk or CD-ROM (n is 0 to 13)."
                                          },
                                          "ostype" : {
                                             "enum" : [
                                                "other",
                                                "wxp",
                                                "w2k",
                                                "w2k3",
                                                "w2k8",
                                                "wvista",
                                                "win7",
                                                "win8",
                                                "l24",
                                                "l26"
                                             ],
                                             "optional" : 1,
                                             "type" : "string",
                                             "description" : "Used to enable special optimization/features for specific\noperating systems:\n\nother  => unspecified OS\nwxp    => Microsoft Windows XP\nw2k    => Microsoft Windows 2000\nw2k3   => Microsoft Windows 2003\nw2k8   => Microsoft Windows 2008\nwvista => Microsoft Windows Vista\nwin7   => Microsoft Windows 7\nwin8   => Microsoft Windows 8/2012\nl24    => Linux 2.4 Kernel\nl26    => Linux 2.6/3.X Kernel\n\nother|l24|l26                       ... no special behaviour\nwxp|w2k|w2k3|w2k8|wvista|win7|win8  ... use --localtime switch\n"
                                          },
                                          "onboot" : {
                                             "optional" : 1,
                                             "type" : "boolean",
                                             "default" : 0,
                                             "description" : "Specifies whether a VM will be started during system bootup."
                                          },
                                          "balloon" : {
                                             "minimum" : 0,
                                             "optional" : 1,
                                             "type" : "integer",
                                             "description" : "Amount of target RAM for the VM in MB. Using zero disables the ballon driver."
                                          },
                                          "tablet" : {
                                             "optional" : 1,
                                             "type" : "boolean",
                                             "default" : 1,
                                             "description" : "Enable/disable the usb tablet device. This device is usually needed to allow absolute mouse positioning. Else the mouse runs out of sync with normal vnc clients. If you're running lots of console-only guests on one host, you may consider disabling this to save some context switches."
                                          },
                                          "localtime" : {
                                             "optional" : 1,
                                             "type" : "boolean",
                                             "description" : "Set the real time clock to local time. This is enabled by default if ostype indicates a Microsoft OS."
                                          },
                                          "freeze" : {
                                             "optional" : 1,
                                             "type" : "boolean",
                                             "description" : "Freeze CPU at startup (use 'c' monitor command to start execution)."
                                          },
                                          "cpu" : {
                                             "enum" : [
                                                "486",
                                                "athlon",
                                                "pentium",
                                                "pentium2",
                                                "pentium3",
                                                "coreduo",
                                                "core2duo",
                                                "kvm32",
                                                "kvm64",
                                                "qemu32",
                                                "qemu64",
                                                "phenom",
                                                "Conroe",
                                                "Penryn",
                                                "Nehalem",
                                                "Westmere",
                                                "SandyBridge",
                                                "Haswell",
                                                "Opteron_G1",
                                                "Opteron_G2",
                                                "Opteron_G3",
                                                "Opteron_G4",
                                                "Opteron_G5",
                                                "host"
                                             ],
                                             "optional" : 1,
                                             "type" : "string",
                                             "default" : "kvm64",
                                             "description" : "Emulated CPU type."
                                          },
                                          "template" : {
                                             "optional" : 1,
                                             "type" : "boolean",
                                             "default" : 0,
                                             "description" : "Enable/disable Template."
                                          },
                                          "startup" : {
                                             "format" : "pve-qm-startup",
                                             "optional" : 1,
                                             "type" : "string",
                                             "typetext" : "[[order=]\\d+] [,up=\\d+] [,down=\\d+] ",
                                             "description" : "Startup and shutdown behavior. Order is a non-negative number defining the general startup order. Shutdown in done with reverse ordering. Additionally you can set the 'up' or 'down' delay in seconds, which specifies a delay to wait before the next VM is started or stopped."
                                          },
                                          "cdrom" : {
                                             "format" : "pve-qm-drive",
                                             "optional" : 1,
                                             "type" : "string",
                                             "typetext" : "volume",
                                             "description" : "This is an alias for option -ide2"
                                          },
                                          "name" : {
                                             "format" : "dns-name",
                                             "optional" : 1,
                                             "type" : "string",
                                             "description" : "Set a name for the VM. Only used on the configuration web interface."
                                          },
                                          "bootdisk" : {
                                             "pattern" : "(ide|sata|scsi|virtio)\\d+",
                                             "format" : "pve-qm-bootdisk",
                                             "optional" : 1,
                                             "type" : "string",
                                             "description" : "Enable booting from specified disk."
                                          },
                                          "description" : {
                                             "optional" : 1,
                                             "type" : "string",
                                             "description" : "Description for the VM. Only used on the configuration web interface. This is saved as comment inside the configuration file."
                                          },
                                          "memory" : {
                                             "minimum" : 16,
                                             "optional" : 1,
                                             "type" : "integer",
                                             "default" : 512,
                                             "description" : "Amount of RAM for the VM in MB. This is the maximum available memory when you use the balloon device."
                                          },
                                          "virtio[n]" : {
                                             "format" : "pve-qm-drive",
                                             "optional" : 1,
                                             "type" : "string",
                                             "typetext" : "[volume=]volume,] [,media=cdrom|disk] [,cyls=c,heads=h,secs=s[,trans=t]] [,snapshot=on|off] [,cache=none|writethrough|writeback|unsafe|directsync] [,format=f] [,backup=yes|no] [,rerror=ignore|report|stop] [,werror=enospc|ignore|report|stop] [,aio=native|threads]",
                                             "description" : "Use volume as VIRTIO hard disk (n is 0 to 15)."
                                          },
                                          "boot" : {
                                             "pattern" : "[acdn]{1,4}",
                                             "optional" : 1,
                                             "type" : "string",
                                             "default" : "cdn",
                                             "description" : "Boot on floppy (a), hard disk (c), CD-ROM (d), or network (n)."
                                          },
                                          "net[n]" : {
                                             "format" : "pve-qm-net",
                                             "optional" : 1,
                                             "type" : "string",
                                             "typetext" : "MODEL=XX:XX:XX:XX:XX:XX [,bridge=<dev>][,rate=<mbps>][,tag=<vlanid>]",
                                             "description" : "Specify network devices.\n\nMODEL is one of: e1000 i82551 i82557b i82559er ne2k_isa ne2k_pci pcnet rtl8139 virtio\n\nXX:XX:XX:XX:XX:XX should be an unique MAC address. This is\nautomatically generated if not specified.\n\nThe bridge parameter can be used to automatically add the interface to a bridge device. The Proxmox VE standard bridge is called 'vmbr0'.\n\nOption 'rate' is used to limit traffic bandwidth from and to this interface. It is specified as floating point number, unit is 'Megabytes per second'.\n\nIf you specify no bridge, we create a kvm 'user' (NATed) network device, which provides DHCP and DNS services. The following addresses are used:\n\n10.0.2.2   Gateway\n10.0.2.3   DNS Server\n10.0.2.4   SMB Server\n\nThe DHCP server assign addresses to the guest starting from 10.0.2.15.\n\n"
                                          },
                                          "cpuunits" : {
                                             "minimum" : 0,
                                             "maximum" : 500000,
                                             "optional" : 1,
                                             "type" : "integer",
                                             "default" : 1000,
                                             "description" : "CPU weight for a VM. Argument is used in the kernel fair scheduler. The larger the number is, the more CPU time this VM gets. Number is relative to weights of all the other running VMs.\n\nNOTE: You can disable fair-scheduler configuration by setting this to 0."
                                          },
                                          "tdf" : {
                                             "optional" : 1,
                                             "type" : "boolean",
                                             "default" : 0,
                                             "description" : "Enable/disable time drift fix."
                                          },
                                          "delete" : {
                                             "format" : "pve-configid-list",
                                             "type" : "string",
                                             "optional" : 1,
                                             "description" : "A list of settings you want to delete."
                                          },
                                          "serial[n]" : {
                                             "pattern" : "/dev/ttyS\\d+",
                                             "optional" : 1,
                                             "type" : "string",
                                             "description" : "Map host serial devices (n is 0 to 3).\n\nNote: This option allows direct access to host hardware. So it is no longer possible to migrate such machines - use with special care.\n\nExperimental: user reported problems with this option.\n"
                                          },
                                          "autostart" : {
                                             "optional" : 1,
                                             "type" : "boolean",
                                             "default" : 0,
                                             "description" : "Automatic restart after crash (currently ignored)."
                                          },
                                          "args" : {
                                             "optional" : 1,
                                             "type" : "string",
                                             "description" : "Note: this option is for experts only. It allows you to pass arbitrary arguments to kvm, for example:\n\nargs: -no-reboot -no-hpet\n"
                                          },
                                          "kvm" : {
                                             "optional" : 1,
                                             "type" : "boolean",
                                             "default" : 1,
                                             "description" : "Enable/disable KVM hardware virtualization."
                                          },
                                          "acpi" : {
                                             "optional" : 1,
                                             "type" : "boolean",
                                             "default" : 1,
                                             "description" : "Enable/disable ACPI."
                                          },
                                          "unused[n]" : {
                                             "format" : "pve-volume-id",
                                             "optional" : 1,
                                             "type" : "string",
                                             "description" : "Reference to unused volumes."
                                          },
                                          "node" : {
                                             "format" : "pve-node",
                                             "type" : "string",
                                             "description" : "The cluster node name."
                                          },
                                          "cpulimit" : {
                                             "minimum" : 0,
                                             "optional" : 1,
                                             "type" : "integer",
                                             "default" : 0,
                                             "description" : "Limit of CPU usage in per cent. Note if the computer has 2 CPUs, it has total of 200% CPU time. Value '0' indicates no CPU limit.\n\nNOTE: This option is currently ignored."
                                          },
                                          "sockets" : {
                                             "minimum" : 1,
                                             "optional" : 1,
                                             "type" : "integer",
                                             "default" : 1,
                                             "description" : "The number of CPU sockets."
                                          },
                                          "parallel[n]" : {
                                             "pattern" : "/dev/parport\\d+",
                                             "optional" : 1,
                                             "type" : "string",
                                             "description" : "Map host parallel devices (n is 0 to 2).\n\nNote: This option allows direct access to host hardware. So it is no longer possible to migrate such machines - use with special care.\n\nExperimental: user reported problems with this option.\n"
                                          },
                                          "vmid" : {
                                             "minimum" : 1,
                                             "format" : "pve-vmid",
                                             "type" : "integer",
                                             "description" : "The (unique) ID of the VM."
                                          },
                                          "keyboard" : {
                                             "enum" : [
                                                "pt",
                                                "tr",
                                                "ja",
                                                "es",
                                                "no",
                                                "is",
                                                "fr-ca",
                                                "fr",
                                                "pt-br",
                                                "da",
                                                "fr-ch",
                                                "sl",
                                                "de-ch",
                                                "en-gb",
                                                "it",
                                                "en-us",
                                                "fr-be",
                                                "hu",
                                                "pl",
                                                "nl",
                                                "mk",
                                                "fi",
                                                "lt",
                                                "sv",
                                                "de"
                                             ],
                                             "optional" : 1,
                                             "type" : "string",
                                             "default" : "en-us",
                                             "description" : "Keybord layout for vnc server. Default is read from the datacenter configuration file."
                                          },
                                          "reboot" : {
                                             "optional" : 1,
                                             "type" : "boolean",
                                             "default" : 1,
                                             "description" : "Allow reboot. If set to '0' the VM exit on reboot."
                                          },
                                          "hotplug" : {
                                             "optional" : 1,
                                             "type" : "boolean",
                                             "default" : 0,
                                             "description" : "Allow hotplug for disk and network device"
                                          },
                                          "migrate_downtime" : {
                                             "minimum" : 0,
                                             "optional" : 1,
                                             "type" : "number",
                                             "default" : 0.1,
                                             "description" : "Set maximum tolerated downtime (in seconds) for migrations."
                                          },
                                          "force" : {
                                             "requires" : "delete",
                                             "type" : "boolean",
                                             "optional" : 1,
                                             "description" : "Force physical removal. Without this, we simple remove the disk from the config file and create an additional configuration entry called 'unused[n]', which contains the volume ID. Unlink of unused[n] always cause physical removal."
                                          },
                                          "usb[n]" : {
                                             "format" : "pve-qm-usb-device",
                                             "optional" : 1,
                                             "type" : "string",
                                             "typetext" : "host=HOSTUSBDEVICE",
                                             "description" : "Configure an USB device (n is 0 to 4). This can be used to\npass-through usb devices to the guest. HOSTUSBDEVICE syntax is:\n\n'bus-port(.port)*' (decimal numbers) or\n'vendor_id:product_id' (hexadeciaml numbers)\n\nYou can use the 'lsusb -t' command to list existing usb devices.\n\nNote: This option allows direct access to host hardware. So it is no longer possible to migrate such machines - use with special care.\n\n"
                                          },
                                          "cores" : {
                                             "minimum" : 1,
                                             "optional" : 1,
                                             "type" : "integer",
                                             "default" : 1,
                                             "description" : "The number of cores per socket."
                                          },
                                          "sata[n]" : {
                                             "format" : "pve-qm-drive",
                                             "optional" : 1,
                                             "type" : "string",
                                             "typetext" : "[volume=]volume,] [,media=cdrom|disk] [,cyls=c,heads=h,secs=s[,trans=t]] [,snapshot=on|off] [,cache=none|writethrough|writeback|unsafe|directsync] [,format=f] [,backup=yes|no] [,rerror=ignore|report|stop] [,werror=enospc|ignore|report|stop] [,aio=native|threads]",
                                             "description" : "Use volume as SATA hard disk or CD-ROM (n is 0 to 5)."
                                          },
                                          "watchdog" : {
                                             "format" : "pve-qm-watchdog",
                                             "optional" : 1,
                                             "type" : "string",
                                             "typetext" : "[[model=]i6300esb|ib700] [,[action=]reset|shutdown|poweroff|pause|debug|none]",
                                             "description" : "Create a virtual hardware watchdog device.  Once enabled (by a guest action), the watchdog must be periodically polled by an agent inside the guest or else the guest will be restarted (or execute the action specified)"
                                          },
                                          "vga" : {
                                             "enum" : [
                                                "std",
                                                "cirrus",
                                                "vmware"
                                             ],
                                             "optional" : 1,
                                             "type" : "string",
                                             "description" : "Select VGA type. If you want to use high resolution modes (>= 1280x1024x16) then you should use option 'std' or 'vmware'. Default is 'std' for win8/win7/w2k8, and 'cirrur' for other OS types"
                                          },
                                          "agent" : {
                                             "optional" : 1,
                                             "type" : "boolean",
                                             "default" : 0,
                                             "description" : "Enable/disable Qemu GuestAgent."
                                          },
                                          "digest" : {
                                             "maxLength" : 40,
                                             "type" : "string",
                                             "optional" : 1,
                                             "description" : "Prevent changes if current configuration file has different SHA1 digest. This can be used to prevent concurrent modifications."
                                          },
                                          "ide[n]" : {
                                             "format" : "pve-qm-drive",
                                             "optional" : 1,
                                             "type" : "string",
                                             "typetext" : "[volume=]volume,] [,media=cdrom|disk] [,cyls=c,heads=h,secs=s[,trans=t]] [,snapshot=on|off] [,cache=none|writethrough|writeback|unsafe|directsync] [,format=f] [,backup=yes|no] [,rerror=ignore|report|stop] [,werror=enospc|ignore|report|stop] [,aio=native|threads]",
                                             "description" : "Use volume as IDE hard disk or CD-ROM (n is 0 to 3)."
                                          },
                                          "migrate_speed" : {
                                             "minimum" : 0,
                                             "optional" : 1,
                                             "type" : "integer",
                                             "default" : 0,
                                             "description" : "Set maximum speed (in MB/s) for migrations. Value 0 is no limit."
                                          },
                                          "skiplock" : {
                                             "optional" : 1,
                                             "type" : "boolean",
                                             "description" : "Ignore locks - only root is allowed to use this option."
                                          }
                                       }
                                    },
                                    "method" : "PUT",
                                    "proxyto" : "node"
                                 },
                                 "GET" : {
                                    "parameters" : {
                                       "additionalProperties" : 0,
                                       "properties" : {
                                          "node" : {
                                             "format" : "pve-node",
                                             "type" : "string",
                                             "description" : "The cluster node name."
                                          },
                                          "vmid" : {
                                             "minimum" : 1,
                                             "format" : "pve-vmid",
                                             "type" : "integer",
                                             "description" : "The (unique) ID of the VM."
                                          }
                                       }
                                    },
                                    "permissions" : {
                                       "check" : [
                                          "perm",
                                          "/vms/{vmid}",
                                          [
                                             "VM.Audit"
                                          ]
                                       ]
                                    },
                                    "returns" : {
                                       "type" : "object",
                                       "properties" : {
                                          "digest" : {
                                             "type" : "string",
                                             "description" : "SHA1 digest of configuration file. This can be used to prevent concurrent modifications."
                                          }
                                       }
                                    },
                                    "name" : "vm_config",
                                    "proxyto" : "node",
                                    "method" : "GET",
                                    "description" : "Get virtual machine configuration."
                                 }
                              },
                              "text" : "config",
                              "path" : "/nodes/{node}/qemu/{vmid}/config",
                              "leaf" : 1
                           },
                           {
                              "info" : {
                                 "PUT" : {
                                    "permissions" : {
                                       "check" : [
                                          "perm",
                                          "/vms/{vmid}",
                                          [
                                             "VM.Config.Disk"
                                          ]
                                       ]
                                    },
                                    "returns" : {
                                       "type" : "null"
                                    },
                                    "name" : "unlink",
                                    "protected" : 1,
                                    "description" : "Unlink/delete disk images.",
                                    "parameters" : {
                                       "additionalProperties" : 0,
                                       "properties" : {
                                          "node" : {
                                             "format" : "pve-node",
                                             "type" : "string",
                                             "description" : "The cluster node name."
                                          },
                                          "vmid" : {
                                             "minimum" : 1,
                                             "format" : "pve-vmid",
                                             "type" : "integer",
                                             "description" : "The (unique) ID of the VM."
                                          },
                                          "idlist" : {
                                             "format" : "pve-configid-list",
                                             "type" : "string",
                                             "description" : "A list of disk IDs you want to delete."
                                          },
                                          "force" : {
                                             "type" : "boolean",
                                             "optional" : 1,
                                             "description" : "Force physical removal. Without this, we simple remove the disk from the config file and create an additional configuration entry called 'unused[n]', which contains the volume ID. Unlink of unused[n] always cause physical removal."
                                          }
                                       }
                                    },
                                    "method" : "PUT",
                                    "proxyto" : "node"
                                 }
                              },
                              "text" : "unlink",
                              "path" : "/nodes/{node}/qemu/{vmid}/unlink",
                              "leaf" : 1
                           },
                           {
                              "info" : {
                                 "POST" : {
                                    "parameters" : {
                                       "additionalProperties" : 0,
                                       "properties" : {
                                          "node" : {
                                             "format" : "pve-node",
                                             "type" : "string",
                                             "description" : "The cluster node name."
                                          },
                                          "vmid" : {
                                             "minimum" : 1,
                                             "format" : "pve-vmid",
                                             "type" : "integer",
                                             "description" : "The (unique) ID of the VM."
                                          }
                                       }
                                    },
                                    "permissions" : {
                                       "check" : [
                                          "perm",
                                          "/vms/{vmid}",
                                          [
                                             "VM.Console"
                                          ]
                                       ]
                                    },
                                    "returns" : {
                                       "additionalProperties" : 0,
                                       "properties" : {
                                          "cert" : {
                                             "type" : "string"
                                          },
                                          "user" : {
                                             "type" : "string"
                                          },
                                          "upid" : {
                                             "type" : "string"
                                          },
                                          "ticket" : {
                                             "type" : "string"
                                          },
                                          "port" : {
                                             "type" : "integer"
                                          }
                                       }
                                    },
                                    "name" : "vncproxy",
                                    "protected" : 1,
                                    "method" : "POST",
                                    "description" : "Creates a TCP VNC proxy connections."
                                 }
                              },
                              "text" : "vncproxy",
                              "path" : "/nodes/{node}/qemu/{vmid}/vncproxy",
                              "leaf" : 1
                           },
                           {
                              "info" : {
                                 "GET" : {
                                    "parameters" : {
                                       "additionalProperties" : 0,
                                       "properties" : {
                                          "node" : {
                                             "format" : "pve-node",
                                             "type" : "string",
                                             "description" : "The cluster node name."
                                          },
                                          "vmid" : {
                                             "minimum" : 1,
                                             "format" : "pve-vmid",
                                             "type" : "integer",
                                             "description" : "The (unique) ID of the VM."
                                          }
                                       }
                                    },
                                    "permissions" : {
                                       "user" : "all"
                                    },
                                    "returns" : {
                                       "type" : "array",
                                       "items" : {
                                          "type" : "object",
                                          "properties" : {
                                             "subdir" : {
                                                "type" : "string"
                                             }
                                          }
                                       },
                                       "links" : [
                                          {
                                             "rel" : "child",
                                             "href" : "{subdir}"
                                          }
                                       ]
                                    },
                                    "name" : "vmcmdidx",
                                    "proxyto" : "node",
                                    "method" : "GET",
                                    "description" : "Directory index"
                                 }
                              },
                              "text" : "status",
                              "children" : [
                                 {
                                    "info" : {
                                       "GET" : {
                                          "permissions" : {
                                             "check" : [
                                                "perm",
                                                "/vms/{vmid}",
                                                [
                                                   "VM.Audit"
                                                ]
                                             ]
                                          },
                                          "returns" : {
                                             "type" : "object"
                                          },
                                          "name" : "vm_status",
                                          "protected" : 1,
                                          "description" : "Get virtual machine status.",
                                          "parameters" : {
                                             "additionalProperties" : 0,
                                             "properties" : {
                                                "node" : {
                                                   "format" : "pve-node",
                                                   "type" : "string",
                                                   "description" : "The cluster node name."
                                                },
                                                "vmid" : {
                                                   "minimum" : 1,
                                                   "format" : "pve-vmid",
                                                   "type" : "integer",
                                                   "description" : "The (unique) ID of the VM."
                                                }
                                             }
                                          },
                                          "method" : "GET",
                                          "proxyto" : "node"
                                       }
                                    },
                                    "text" : "current",
                                    "path" : "/nodes/{node}/qemu/{vmid}/status/current",
                                    "leaf" : 1
                                 },
                                 {
                                    "info" : {
                                       "POST" : {
                                          "permissions" : {
                                             "check" : [
                                                "perm",
                                                "/vms/{vmid}",
                                                [
                                                   "VM.PowerMgmt"
                                                ]
                                             ]
                                          },
                                          "returns" : {
                                             "type" : "string"
                                          },
                                          "name" : "vm_start",
                                          "protected" : 1,
                                          "description" : "Start virtual machine.",
                                          "parameters" : {
                                             "additionalProperties" : 0,
                                             "properties" : {
                                                "migratedfrom" : {
                                                   "format" : "pve-node",
                                                   "optional" : 1,
                                                   "type" : "string",
                                                   "description" : "The cluster node name."
                                                },
                                                "stateuri" : {
                                                   "maxLength" : 128,
                                                   "optional" : 1,
                                                   "type" : "string",
                                                   "description" : "Some command save/restore state from this location."
                                                },
                                                "node" : {
                                                   "format" : "pve-node",
                                                   "type" : "string",
                                                   "description" : "The cluster node name."
                                                },
                                                "vmid" : {
                                                   "minimum" : 1,
                                                   "format" : "pve-vmid",
                                                   "type" : "integer",
                                                   "description" : "The (unique) ID of the VM."
                                                },
                                                "skiplock" : {
                                                   "optional" : 1,
                                                   "type" : "boolean",
                                                   "description" : "Ignore locks - only root is allowed to use this option."
                                                }
                                             }
                                          },
                                          "method" : "POST",
                                          "proxyto" : "node"
                                       }
                                    },
                                    "text" : "start",
                                    "path" : "/nodes/{node}/qemu/{vmid}/status/start",
                                    "leaf" : 1
                                 },
                                 {
                                    "info" : {
                                       "POST" : {
                                          "permissions" : {
                                             "check" : [
                                                "perm",
                                                "/vms/{vmid}",
                                                [
                                                   "VM.PowerMgmt"
                                                ]
                                             ]
                                          },
                                          "returns" : {
                                             "type" : "string"
                                          },
                                          "name" : "vm_stop",
                                          "protected" : 1,
                                          "description" : "Stop virtual machine.",
                                          "parameters" : {
                                             "additionalProperties" : 0,
                                             "properties" : {
                                                "migratedfrom" : {
                                                   "format" : "pve-node",
                                                   "optional" : 1,
                                                   "type" : "string",
                                                   "description" : "The cluster node name."
                                                },
                                                "timeout" : {
                                                   "minimum" : 0,
                                                   "type" : "integer",
                                                   "optional" : 1,
                                                   "description" : "Wait maximal timeout seconds."
                                                },
                                                "node" : {
                                                   "format" : "pve-node",
                                                   "type" : "string",
                                                   "description" : "The cluster node name."
                                                },
                                                "vmid" : {
                                                   "minimum" : 1,
                                                   "format" : "pve-vmid",
                                                   "type" : "integer",
                                                   "description" : "The (unique) ID of the VM."
                                                },
                                                "skiplock" : {
                                                   "optional" : 1,
                                                   "type" : "boolean",
                                                   "description" : "Ignore locks - only root is allowed to use this option."
                                                },
                                                "keepActive" : {
                                                   "type" : "boolean",
                                                   "optional" : 1,
                                                   "default" : 0,
                                                   "description" : "Do not decativate storage volumes."
                                                }
                                             }
                                          },
                                          "method" : "POST",
                                          "proxyto" : "node"
                                       }
                                    },
                                    "text" : "stop",
                                    "path" : "/nodes/{node}/qemu/{vmid}/status/stop",
                                    "leaf" : 1
                                 },
                                 {
                                    "info" : {
                                       "POST" : {
                                          "permissions" : {
                                             "check" : [
                                                "perm",
                                                "/vms/{vmid}",
                                                [
                                                   "VM.PowerMgmt"
                                                ]
                                             ]
                                          },
                                          "returns" : {
                                             "type" : "string"
                                          },
                                          "name" : "vm_reset",
                                          "protected" : 1,
                                          "description" : "Reset virtual machine.",
                                          "parameters" : {
                                             "additionalProperties" : 0,
                                             "properties" : {
                                                "node" : {
                                                   "format" : "pve-node",
                                                   "type" : "string",
                                                   "description" : "The cluster node name."
                                                },
                                                "vmid" : {
                                                   "minimum" : 1,
                                                   "format" : "pve-vmid",
                                                   "type" : "integer",
                                                   "description" : "The (unique) ID of the VM."
                                                },
                                                "skiplock" : {
                                                   "optional" : 1,
                                                   "type" : "boolean",
                                                   "description" : "Ignore locks - only root is allowed to use this option."
                                                }
                                             }
                                          },
                                          "method" : "POST",
                                          "proxyto" : "node"
                                       }
                                    },
                                    "text" : "reset",
                                    "path" : "/nodes/{node}/qemu/{vmid}/status/reset",
                                    "leaf" : 1
                                 },
                                 {
                                    "info" : {
                                       "POST" : {
                                          "permissions" : {
                                             "check" : [
                                                "perm",
                                                "/vms/{vmid}",
                                                [
                                                   "VM.PowerMgmt"
                                                ]
                                             ]
                                          },
                                          "returns" : {
                                             "type" : "string"
                                          },
                                          "name" : "vm_shutdown",
                                          "protected" : 1,
                                          "description" : "Shutdown virtual machine.",
                                          "parameters" : {
                                             "additionalProperties" : 0,
                                             "properties" : {
                                                "timeout" : {
                                                   "minimum" : 0,
                                                   "type" : "integer",
                                                   "optional" : 1,
                                                   "description" : "Wait maximal timeout seconds."
                                                },
                                                "forceStop" : {
                                                   "type" : "boolean",
                                                   "optional" : 1,
                                                   "default" : 0,
                                                   "description" : "Make sure the VM stops."
                                                },
                                                "node" : {
                                                   "format" : "pve-node",
                                                   "type" : "string",
                                                   "description" : "The cluster node name."
                                                },
                                                "vmid" : {
                                                   "minimum" : 1,
                                                   "format" : "pve-vmid",
                                                   "type" : "integer",
                                                   "description" : "The (unique) ID of the VM."
                                                },
                                                "skiplock" : {
                                                   "optional" : 1,
                                                   "type" : "boolean",
                                                   "description" : "Ignore locks - only root is allowed to use this option."
                                                },
                                                "keepActive" : {
                                                   "type" : "boolean",
                                                   "optional" : 1,
                                                   "default" : 0,
                                                   "description" : "Do not decativate storage volumes."
                                                }
                                             }
                                          },
                                          "method" : "POST",
                                          "proxyto" : "node"
                                       }
                                    },
                                    "text" : "shutdown",
                                    "path" : "/nodes/{node}/qemu/{vmid}/status/shutdown",
                                    "leaf" : 1
                                 },
                                 {
                                    "info" : {
                                       "POST" : {
                                          "permissions" : {
                                             "check" : [
                                                "perm",
                                                "/vms/{vmid}",
                                                [
                                                   "VM.PowerMgmt"
                                                ]
                                             ]
                                          },
                                          "returns" : {
                                             "type" : "string"
                                          },
                                          "name" : "vm_suspend",
                                          "protected" : 1,
                                          "description" : "Suspend virtual machine.",
                                          "parameters" : {
                                             "additionalProperties" : 0,
                                             "properties" : {
                                                "node" : {
                                                   "format" : "pve-node",
                                                   "type" : "string",
                                                   "description" : "The cluster node name."
                                                },
                                                "vmid" : {
                                                   "minimum" : 1,
                                                   "format" : "pve-vmid",
                                                   "type" : "integer",
                                                   "description" : "The (unique) ID of the VM."
                                                },
                                                "skiplock" : {
                                                   "optional" : 1,
                                                   "type" : "boolean",
                                                   "description" : "Ignore locks - only root is allowed to use this option."
                                                }
                                             }
                                          },
                                          "method" : "POST",
                                          "proxyto" : "node"
                                       }
                                    },
                                    "text" : "suspend",
                                    "path" : "/nodes/{node}/qemu/{vmid}/status/suspend",
                                    "leaf" : 1
                                 },
                                 {
                                    "info" : {
                                       "POST" : {
                                          "permissions" : {
                                             "check" : [
                                                "perm",
                                                "/vms/{vmid}",
                                                [
                                                   "VM.PowerMgmt"
                                                ]
                                             ]
                                          },
                                          "returns" : {
                                             "type" : "string"
                                          },
                                          "name" : "vm_resume",
                                          "protected" : 1,
                                          "description" : "Resume virtual machine.",
                                          "parameters" : {
                                             "additionalProperties" : 0,
                                             "properties" : {
                                                "node" : {
                                                   "format" : "pve-node",
                                                   "type" : "string",
                                                   "description" : "The cluster node name."
                                                },
                                                "vmid" : {
                                                   "minimum" : 1,
                                                   "format" : "pve-vmid",
                                                   "type" : "integer",
                                                   "description" : "The (unique) ID of the VM."
                                                },
                                                "skiplock" : {
                                                   "optional" : 1,
                                                   "type" : "boolean",
                                                   "description" : "Ignore locks - only root is allowed to use this option."
                                                }
                                             }
                                          },
                                          "method" : "POST",
                                          "proxyto" : "node"
                                       }
                                    },
                                    "text" : "resume",
                                    "path" : "/nodes/{node}/qemu/{vmid}/status/resume",
                                    "leaf" : 1
                                 }
                              ],
                              "path" : "/nodes/{node}/qemu/{vmid}/status",
                              "leaf" : 0
                           },
                           {
                              "info" : {
                                 "PUT" : {
                                    "permissions" : {
                                       "check" : [
                                          "perm",
                                          "/vms/{vmid}",
                                          [
                                             "VM.Console"
                                          ]
                                       ]
                                    },
                                    "returns" : {
                                       "type" : "null"
                                    },
                                    "name" : "vm_sendkey",
                                    "protected" : 1,
                                    "description" : "Send key event to virtual machine.",
                                    "parameters" : {
                                       "additionalProperties" : 0,
                                       "properties" : {
                                          "node" : {
                                             "format" : "pve-node",
                                             "type" : "string",
                                             "description" : "The cluster node name."
                                          },
                                          "vmid" : {
                                             "minimum" : 1,
                                             "format" : "pve-vmid",
                                             "type" : "integer",
                                             "description" : "The (unique) ID of the VM."
                                          },
                                          "skiplock" : {
                                             "optional" : 1,
                                             "type" : "boolean",
                                             "description" : "Ignore locks - only root is allowed to use this option."
                                          },
                                          "key" : {
                                             "type" : "string",
                                             "description" : "The key (qemu monitor encoding)."
                                          }
                                       }
                                    },
                                    "method" : "PUT",
                                    "proxyto" : "node"
                                 }
                              },
                              "text" : "sendkey",
                              "path" : "/nodes/{node}/qemu/{vmid}/sendkey",
                              "leaf" : 1
                           },
                           {
                              "info" : {
                                 "GET" : {
                                    "permissions" : {
                                       "check" : [
                                          "perm",
                                          "/vms/{vmid}",
                                          [
                                             "VM.Audit"
                                          ]
                                       ]
                                    },
                                    "returns" : {
                                       "type" : "object",
                                       "properties" : {
                                          "nodes" : {
                                             "type" : "array",
                                             "items" : {
                                                "type" : "string"
                                             }
                                          },
                                          "hasFeature" : {
                                             "type" : "boolean"
                                          }
                                       }
                                    },
                                    "name" : "vm_feature",
                                    "protected" : 1,
                                    "description" : "Check if feature for virtual machine is available.",
                                    "parameters" : {
                                       "additionalProperties" : 0,
                                       "properties" : {
                                          "feature" : {
                                             "enum" : [
                                                "snapshot",
                                                "clone",
                                                "copy"
                                             ],
                                             "type" : "string",
                                             "description" : "Feature to check."
                                          },
                                          "snapname" : {
                                             "format" : "pve-configid",
                                             "maxLength" : 40,
                                             "optional" : 1,
                                             "type" : "string",
                                             "description" : "The name of the snapshot."
                                          },
                                          "node" : {
                                             "format" : "pve-node",
                                             "type" : "string",
                                             "description" : "The cluster node name."
                                          },
                                          "vmid" : {
                                             "minimum" : 1,
                                             "format" : "pve-vmid",
                                             "type" : "integer",
                                             "description" : "The (unique) ID of the VM."
                                          }
                                       }
                                    },
                                    "method" : "GET",
                                    "proxyto" : "node"
                                 }
                              },
                              "text" : "feature",
                              "path" : "/nodes/{node}/qemu/{vmid}/feature",
                              "leaf" : 1
                           },
                           {
                              "info" : {
                                 "POST" : {
                                    "permissions" : {
                                       "check" : [
                                          "and",
                                          [
                                             "perm",
                                             "/vms/{vmid}",
                                             [
                                                "VM.Clone"
                                             ]
                                          ],
                                          [
                                             "or",
                                             [
                                                "perm",
                                                "/vms/{newid}",
                                                [
                                                   "VM.Allocate"
                                                ]
                                             ],
                                             [
                                                "perm",
                                                "/pool/{pool}",
                                                [
                                                   "VM.Allocate"
                                                ],
                                                "require_param",
                                                "pool"
                                             ]
                                          ]
                                       ],
                                       "description" : "You need 'VM.Clone' permissions on /vms/{vmid}, and 'VM.Allocate' permissions on /vms/{newid} (or on the VM pool /pool/{pool}). You also need 'Datastore.AllocateSpace' on any used storage."
                                    },
                                    "returns" : {
                                       "type" : "string"
                                    },
                                    "name" : "clone_vm",
                                    "protected" : 1,
                                    "description" : "Create a copy of virtual machine/template.",
                                    "parameters" : {
                                       "additionalProperties" : 0,
                                       "properties" : {
                                          "name" : {
                                             "format" : "dns-name",
                                             "optional" : 1,
                                             "type" : "string",
                                             "description" : "Set a name for the new VM."
                                          },
                                          "node" : {
                                             "format" : "pve-node",
                                             "type" : "string",
                                             "description" : "The cluster node name."
                                          },
                                          "description" : {
                                             "optional" : 1,
                                             "type" : "string",
                                             "description" : "Description for the new VM."
                                          },
                                          "full" : {
                                             "optional" : 1,
                                             "type" : "boolean",
                                             "default" : 0,
                                             "description" : "Create a full copy of all disk. This is always done when you clone a normal VM. For VM templates, we try to create a linked clone by default."
                                          },
                                          "target" : {
                                             "format" : "pve-node",
                                             "optional" : 1,
                                             "type" : "string",
                                             "description" : "Target node. Only allowed if the original VM is on shared storage."
                                          },
                                          "format" : {
                                             "requires" : "full",
                                             "enum" : [
                                                "raw",
                                                "qcow2",
                                                "vmdk"
                                             ],
                                             "type" : "string",
                                             "optional" : 1,
                                             "description" : "Target format for file storage."
                                          },
                                          "newid" : {
                                             "minimum" : 1,
                                             "format" : "pve-vmid",
                                             "type" : "integer",
                                             "description" : "VMID for the clone."
                                          },
                                          "snapname" : {
                                             "format" : "pve-configid",
                                             "maxLength" : 40,
                                             "requires" : "full",
                                             "optional" : 1,
                                             "type" : "string",
                                             "description" : "The name of the snapshot."
                                          },
                                          "pool" : {
                                             "format" : "pve-poolid",
                                             "optional" : 1,
                                             "type" : "string",
                                             "description" : "Add the new VM to the specified pool."
                                          },
                                          "storage" : {
                                             "format" : "pve-storage-id",
                                             "requires" : "full",
                                             "optional" : 1,
                                             "type" : "string",
                                             "description" : "Target storage for full clone."
                                          },
                                          "vmid" : {
                                             "minimum" : 1,
                                             "format" : "pve-vmid",
                                             "type" : "integer",
                                             "description" : "The (unique) ID of the VM."
                                          }
                                       }
                                    },
                                    "method" : "POST",
                                    "proxyto" : "node"
                                 }
                              },
                              "text" : "clone",
                              "path" : "/nodes/{node}/qemu/{vmid}/clone",
                              "leaf" : 1
                           },
                           {
                              "info" : {
                                 "POST" : {
                                    "permissions" : {
                                       "check" : [
                                          "perm",
                                          "/vms/{vmid}",
                                          [
                                             "VM.Migrate"
                                          ]
                                       ]
                                    },
                                    "returns" : {
                                       "type" : "string",
                                       "description" : "the task ID."
                                    },
                                    "name" : "migrate_vm",
                                    "protected" : 1,
                                    "description" : "Migrate virtual machine. Creates a new migration task.",
                                    "parameters" : {
                                       "additionalProperties" : 0,
                                       "properties" : {
                                          "target" : {
                                             "format" : "pve-node",
                                             "type" : "string",
                                             "description" : "Target node."
                                          },
                                          "node" : {
                                             "format" : "pve-node",
                                             "type" : "string",
                                             "description" : "The cluster node name."
                                          },
                                          "vmid" : {
                                             "minimum" : 1,
                                             "format" : "pve-vmid",
                                             "type" : "integer",
                                             "description" : "The (unique) ID of the VM."
                                          },
                                          "online" : {
                                             "type" : "boolean",
                                             "optional" : 1,
                                             "description" : "Use online/live migration."
                                          },
                                          "force" : {
                                             "type" : "boolean",
                                             "optional" : 1,
                                             "description" : "Allow to migrate VMs which use local devices. Only root may use this option."
                                          }
                                       }
                                    },
                                    "method" : "POST",
                                    "proxyto" : "node"
                                 }
                              },
                              "text" : "migrate",
                              "path" : "/nodes/{node}/qemu/{vmid}/migrate",
                              "leaf" : 1
                           },
                           {
                              "info" : {
                                 "POST" : {
                                    "permissions" : {
                                       "check" : [
                                          "perm",
                                          "/vms/{vmid}",
                                          [
                                             "VM.Monitor"
                                          ]
                                       ]
                                    },
                                    "returns" : {
                                       "type" : "string"
                                    },
                                    "name" : "monitor",
                                    "protected" : 1,
                                    "description" : "Execute Qemu monitor commands.",
                                    "parameters" : {
                                       "additionalProperties" : 0,
                                       "properties" : {
                                          "node" : {
                                             "format" : "pve-node",
                                             "type" : "string",
                                             "description" : "The cluster node name."
                                          },
                                          "vmid" : {
                                             "minimum" : 1,
                                             "format" : "pve-vmid",
                                             "type" : "integer",
                                             "description" : "The (unique) ID of the VM."
                                          },
                                          "command" : {
                                             "type" : "string",
                                             "description" : "The monitor command."
                                          }
                                       }
                                    },
                                    "method" : "POST",
                                    "proxyto" : "node"
                                 }
                              },
                              "text" : "monitor",
                              "path" : "/nodes/{node}/qemu/{vmid}/monitor",
                              "leaf" : 1
                           },
                           {
                              "info" : {
                                 "PUT" : {
                                    "permissions" : {
                                       "check" : [
                                          "perm",
                                          "/vms/{vmid}",
                                          [
                                             "VM.Config.Disk"
                                          ]
                                       ]
                                    },
                                    "returns" : {
                                       "type" : "null"
                                    },
                                    "name" : "resize_vm",
                                    "protected" : 1,
                                    "description" : "Extend volume size.",
                                    "parameters" : {
                                       "additionalProperties" : 0,
                                       "properties" : {
                                          "disk" : {
                                             "enum" : [
                                                "ide0",
                                                "ide1",
                                                "ide2",
                                                "ide3",
                                                "scsi0",
                                                "scsi1",
                                                "scsi2",
                                                "scsi3",
                                                "scsi4",
                                                "scsi5",
                                                "scsi6",
                                                "scsi7",
                                                "scsi8",
                                                "scsi9",
                                                "scsi10",
                                                "scsi11",
                                                "scsi12",
                                                "scsi13",
                                                "virtio0",
                                                "virtio1",
                                                "virtio2",
                                                "virtio3",
                                                "virtio4",
                                                "virtio5",
                                                "virtio6",
                                                "virtio7",
                                                "virtio8",
                                                "virtio9",
                                                "virtio10",
                                                "virtio11",
                                                "virtio12",
                                                "virtio13",
                                                "virtio14",
                                                "virtio15",
                                                "sata0",
                                                "sata1",
                                                "sata2",
                                                "sata3",
                                                "sata4",
                                                "sata5"
                                             ],
                                             "type" : "string",
                                             "description" : "The disk you want to resize."
                                          },
                                          "digest" : {
                                             "maxLength" : 40,
                                             "type" : "string",
                                             "optional" : 1,
                                             "description" : "Prevent changes if current configuration file has different SHA1 digest. This can be used to prevent concurrent modifications."
                                          },
                                          "node" : {
                                             "format" : "pve-node",
                                             "type" : "string",
                                             "description" : "The cluster node name."
                                          },
                                          "vmid" : {
                                             "minimum" : 1,
                                             "format" : "pve-vmid",
                                             "type" : "integer",
                                             "description" : "The (unique) ID of the VM."
                                          },
                                          "skiplock" : {
                                             "optional" : 1,
                                             "type" : "boolean",
                                             "description" : "Ignore locks - only root is allowed to use this option."
                                          },
                                          "size" : {
                                             "pattern" : "\\+?\\d+(\\.\\d+)?[KMGT]?",
                                             "type" : "string",
                                             "description" : "The new size. With the '+' sign the value is added to the actual size of the volume and without it, the value is taken as an absolute one. Shrinking disk size is not supported."
                                          }
                                       }
                                    },
                                    "method" : "PUT",
                                    "proxyto" : "node"
                                 }
                              },
                              "text" : "resize",
                              "path" : "/nodes/{node}/qemu/{vmid}/resize",
                              "leaf" : 1
                           },
                           {
                              "info" : {
                                 "POST" : {
                                    "permissions" : {
                                       "check" : [
                                          "perm",
                                          "/vms/{vmid}",
                                          [
                                             "VM.Snapshot"
                                          ]
                                       ]
                                    },
                                    "returns" : {
                                       "type" : "string",
                                       "description" : "the task ID."
                                    },
                                    "name" : "snapshot",
                                    "protected" : 1,
                                    "description" : "Snapshot a VM.",
                                    "parameters" : {
                                       "additionalProperties" : 0,
                                       "properties" : {
                                          "freezefs" : {
                                             "optional" : 1,
                                             "type" : "boolean",
                                             "description" : "Freeze the filesystem"
                                          },
                                          "snapname" : {
                                             "format" : "pve-configid",
                                             "maxLength" : 40,
                                             "type" : "string",
                                             "description" : "The name of the snapshot."
                                          },
                                          "node" : {
                                             "format" : "pve-node",
                                             "type" : "string",
                                             "description" : "The cluster node name."
                                          },
                                          "vmid" : {
                                             "minimum" : 1,
                                             "format" : "pve-vmid",
                                             "type" : "integer",
                                             "description" : "The (unique) ID of the VM."
                                          },
                                          "description" : {
                                             "optional" : 1,
                                             "type" : "string",
                                             "description" : "A textual description or comment."
                                          },
                                          "vmstate" : {
                                             "optional" : 1,
                                             "type" : "boolean",
                                             "description" : "Save the vmstate"
                                          }
                                       }
                                    },
                                    "method" : "POST",
                                    "proxyto" : "node"
                                 },
                                 "GET" : {
                                    "permissions" : {
                                       "check" : [
                                          "perm",
                                          "/vms/{vmid}",
                                          [
                                             "VM.Audit"
                                          ]
                                       ]
                                    },
                                    "returns" : {
                                       "type" : "array",
                                       "items" : {
                                          "type" : "object",
                                          "properties" : {}
                                       },
                                       "links" : [
                                          {
                                             "rel" : "child",
                                             "href" : "{name}"
                                          }
                                       ]
                                    },
                                    "name" : "snapshot_list",
                                    "protected" : 1,
                                    "description" : "List all snapshots.",
                                    "parameters" : {
                                       "additionalProperties" : 0,
                                       "properties" : {
                                          "vmid" : {
                                             "minimum" : 1,
                                             "format" : "pve-vmid",
                                             "type" : "integer",
                                             "description" : "The (unique) ID of the VM."
                                          },
                                          "node" : {
                                             "format" : "pve-node",
                                             "type" : "string",
                                             "description" : "The cluster node name."
                                          }
                                       }
                                    },
                                    "method" : "GET",
                                    "proxyto" : "node"
                                 }
                              },
                              "text" : "snapshot",
                              "children" : [
                                 {
                                    "info" : {
                                       "DELETE" : {
                                          "permissions" : {
                                             "check" : [
                                                "perm",
                                                "/vms/{vmid}",
                                                [
                                                   "VM.Snapshot"
                                                ]
                                             ]
                                          },
                                          "returns" : {
                                             "type" : "string",
                                             "description" : "the task ID."
                                          },
                                          "name" : "delsnapshot",
                                          "protected" : 1,
                                          "description" : "Delete a VM snapshot.",
                                          "parameters" : {
                                             "additionalProperties" : 0,
                                             "properties" : {
                                                "snapname" : {
                                                   "format" : "pve-configid",
                                                   "maxLength" : 40,
                                                   "type" : "string",
                                                   "description" : "The name of the snapshot."
                                                },
                                                "node" : {
                                                   "format" : "pve-node",
                                                   "type" : "string",
                                                   "description" : "The cluster node name."
                                                },
                                                "vmid" : {
                                                   "minimum" : 1,
                                                   "format" : "pve-vmid",
                                                   "type" : "integer",
                                                   "description" : "The (unique) ID of the VM."
                                                },
                                                "force" : {
                                                   "optional" : 1,
                                                   "type" : "boolean",
                                                   "description" : "For removal from config file, even if removing disk snapshots fails."
                                                }
                                             }
                                          },
                                          "method" : "DELETE",
                                          "proxyto" : "node"
                                       },
                                       "GET" : {
                                          "parameters" : {
                                             "additionalProperties" : 0,
                                             "properties" : {
                                                "snapname" : {
                                                   "format" : "pve-configid",
                                                   "maxLength" : 40,
                                                   "type" : "string",
                                                   "description" : "The name of the snapshot."
                                                },
                                                "vmid" : {
                                                   "minimum" : 1,
                                                   "format" : "pve-vmid",
                                                   "type" : "integer",
                                                   "description" : "The (unique) ID of the VM."
                                                },
                                                "node" : {
                                                   "format" : "pve-node",
                                                   "type" : "string",
                                                   "description" : "The cluster node name."
                                                }
                                             }
                                          },
                                          "permissions" : {
                                             "user" : "all"
                                          },
                                          "returns" : {
                                             "type" : "array",
                                             "items" : {
                                                "type" : "object",
                                                "properties" : {}
                                             },
                                             "links" : [
                                                {
                                                   "rel" : "child",
                                                   "href" : "{cmd}"
                                                }
                                             ]
                                          },
                                          "name" : "snapshot_cmd_idx",
                                          "method" : "GET",
                                          "description" : ""
                                       }
                                    },
                                    "text" : "{snapname}",
                                    "children" : [
                                       {
                                          "info" : {
                                             "GET" : {
                                                "parameters" : {
                                                   "additionalProperties" : 0,
                                                   "properties" : {
                                                      "snapname" : {
                                                         "format" : "pve-configid",
                                                         "maxLength" : 40,
                                                         "type" : "string",
                                                         "description" : "The name of the snapshot."
                                                      },
                                                      "node" : {
                                                         "format" : "pve-node",
                                                         "type" : "string",
                                                         "description" : "The cluster node name."
                                                      },
                                                      "vmid" : {
                                                         "minimum" : 1,
                                                         "format" : "pve-vmid",
                                                         "type" : "integer",
                                                         "description" : "The (unique) ID of the VM."
                                                      }
                                                   }
                                                },
                                                "permissions" : {
                                                   "check" : [
                                                      "perm",
                                                      "/vms/{vmid}",
                                                      [
                                                         "VM.Snapshot"
                                                      ]
                                                   ]
                                                },
                                                "returns" : {
                                                   "type" : "object"
                                                },
                                                "name" : "get_snapshot_config",
                                                "proxyto" : "node",
                                                "method" : "GET",
                                                "description" : "Get snapshot configuration"
                                             },
                                             "PUT" : {
                                                "permissions" : {
                                                   "check" : [
                                                      "perm",
                                                      "/vms/{vmid}",
                                                      [
                                                         "VM.Snapshot"
                                                      ]
                                                   ]
                                                },
                                                "returns" : {
                                                   "type" : "null"
                                                },
                                                "name" : "update_snapshot_config",
                                                "protected" : 1,
                                                "description" : "Update snapshot metadata.",
                                                "parameters" : {
                                                   "additionalProperties" : 0,
                                                   "properties" : {
                                                      "snapname" : {
                                                         "format" : "pve-configid",
                                                         "maxLength" : 40,
                                                         "type" : "string",
                                                         "description" : "The name of the snapshot."
                                                      },
                                                      "node" : {
                                                         "format" : "pve-node",
                                                         "type" : "string",
                                                         "description" : "The cluster node name."
                                                      },
                                                      "vmid" : {
                                                         "minimum" : 1,
                                                         "format" : "pve-vmid",
                                                         "type" : "integer",
                                                         "description" : "The (unique) ID of the VM."
                                                      },
                                                      "description" : {
                                                         "optional" : 1,
                                                         "type" : "string",
                                                         "description" : "A textual description or comment."
                                                      }
                                                   }
                                                },
                                                "method" : "PUT",
                                                "proxyto" : "node"
                                             }
                                          },
                                          "text" : "config",
                                          "path" : "/nodes/{node}/qemu/{vmid}/snapshot/{snapname}/config",
                                          "leaf" : 1
                                       },
                                       {
                                          "info" : {
                                             "POST" : {
                                                "permissions" : {
                                                   "check" : [
                                                      "perm",
                                                      "/vms/{vmid}",
                                                      [
                                                         "VM.Snapshot"
                                                      ]
                                                   ]
                                                },
                                                "returns" : {
                                                   "type" : "string",
                                                   "description" : "the task ID."
                                                },
                                                "name" : "rollback",
                                                "protected" : 1,
                                                "description" : "Rollback VM state to specified snapshot.",
                                                "parameters" : {
                                                   "additionalProperties" : 0,
                                                   "properties" : {
                                                      "snapname" : {
                                                         "format" : "pve-configid",
                                                         "maxLength" : 40,
                                                         "type" : "string",
                                                         "description" : "The name of the snapshot."
                                                      },
                                                      "node" : {
                                                         "format" : "pve-node",
                                                         "type" : "string",
                                                         "description" : "The cluster node name."
                                                      },
                                                      "vmid" : {
                                                         "minimum" : 1,
                                                         "format" : "pve-vmid",
                                                         "type" : "integer",
                                                         "description" : "The (unique) ID of the VM."
                                                      }
                                                   }
                                                },
                                                "method" : "POST",
                                                "proxyto" : "node"
                                             }
                                          },
                                          "text" : "rollback",
                                          "path" : "/nodes/{node}/qemu/{vmid}/snapshot/{snapname}/rollback",
                                          "leaf" : 1
                                       }
                                    ],
                                    "path" : "/nodes/{node}/qemu/{vmid}/snapshot/{snapname}",
                                    "leaf" : 0
                                 }
                              ],
                              "path" : "/nodes/{node}/qemu/{vmid}/snapshot",
                              "leaf" : 0
                           },
                           {
                              "info" : {
                                 "POST" : {
                                    "permissions" : {
                                       "check" : [
                                          "perm",
                                          "/vms/{vmid}",
                                          [
                                             "VM.Allocate"
                                          ]
                                       ],
                                       "description" : "You need 'VM.Allocate' permissions on /vms/{vmid}"
                                    },
                                    "returns" : {
                                       "type" : "null"
                                    },
                                    "name" : "template",
                                    "protected" : 1,
                                    "description" : "Create a Template.",
                                    "parameters" : {
                                       "additionalProperties" : 0,
                                       "properties" : {
                                          "disk" : {
                                             "enum" : [
                                                "ide0",
                                                "ide1",
                                                "ide2",
                                                "ide3",
                                                "scsi0",
                                                "scsi1",
                                                "scsi2",
                                                "scsi3",
                                                "scsi4",
                                                "scsi5",
                                                "scsi6",
                                                "scsi7",
                                                "scsi8",
                                                "scsi9",
                                                "scsi10",
                                                "scsi11",
                                                "scsi12",
                                                "scsi13",
                                                "virtio0",
                                                "virtio1",
                                                "virtio2",
                                                "virtio3",
                                                "virtio4",
                                                "virtio5",
                                                "virtio6",
                                                "virtio7",
                                                "virtio8",
                                                "virtio9",
                                                "virtio10",
                                                "virtio11",
                                                "virtio12",
                                                "virtio13",
                                                "virtio14",
                                                "virtio15",
                                                "sata0",
                                                "sata1",
                                                "sata2",
                                                "sata3",
                                                "sata4",
                                                "sata5"
                                             ],
                                             "optional" : 1,
                                             "type" : "string",
                                             "description" : "If you want to convert only 1 disk to base image."
                                          },
                                          "node" : {
                                             "format" : "pve-node",
                                             "type" : "string",
                                             "description" : "The cluster node name."
                                          },
                                          "vmid" : {
                                             "minimum" : 1,
                                             "format" : "pve-vmid",
                                             "type" : "integer",
                                             "description" : "The (unique) ID of the VM."
                                          }
                                       }
                                    },
                                    "method" : "POST",
                                    "proxyto" : "node"
                                 }
                              },
                              "text" : "template",
                              "path" : "/nodes/{node}/qemu/{vmid}/template",
                              "leaf" : 1
                           }
                        ],
                        "path" : "/nodes/{node}/qemu/{vmid}",
                        "leaf" : 0
                     }
                  ],
                  "path" : "/nodes/{node}/qemu",
                  "leaf" : 0
               },
               {
                  "info" : {
                     "POST" : {
                        "permissions" : {
                           "check" : [
                              "or",
                              [
                                 "perm",
                                 "/vms/{vmid}",
                                 [
                                    "VM.Allocate"
                                 ]
                              ],
                              [
                                 "perm",
                                 "/pool/{pool}",
                                 [
                                    "VM.Allocate"
                                 ],
                                 "require_param",
                                 "pool"
                              ]
                           ],
                           "description" : "You need 'VM.Allocate' permissions on /vms/{vmid} or on the VM pool /pool/{pool}, and 'Datastore.AllocateSpace' on the storage."
                        },
                        "returns" : {
                           "type" : "string"
                        },
                        "name" : "create_vm",
                        "protected" : 1,
                        "description" : "Create or restore a container.",
                        "parameters" : {
                           "additionalProperties" : 0,
                           "properties" : {
                              "disk" : {
                                 "minimum" : 0,
                                 "optional" : 1,
                                 "type" : "number",
                                 "default" : 2,
                                 "description" : "Amount of disk space for the VM in GB. A zero indicates no limits."
                              },
                              "ostemplate" : {
                                 "maxLength" : 255,
                                 "type" : "string",
                                 "description" : "The OS template or backup file."
                              },
                              "restore" : {
                                 "optional" : 1,
                                 "type" : "boolean",
                                 "description" : "Mark this as restore task."
                              },
                              "hostname" : {
                                 "maxLength" : 255,
                                 "optional" : 1,
                                 "type" : "string",
                                 "description" : "Set a host name for the container."
                              },
                              "node" : {
                                 "format" : "pve-node",
                                 "type" : "string",
                                 "description" : "The cluster node name."
                              },
                              "nameserver" : {
                                 "optional" : 1,
                                 "type" : "string",
                                 "description" : "Sets DNS server IP address for a container. Create will automatically use the setting from the host if you neither set searchdomain or nameserver."
                              },
                              "searchdomain" : {
                                 "optional" : 1,
                                 "type" : "string",
                                 "description" : "Sets DNS search domains for a container. Create will automatically use the setting from the host if you neither set searchdomain or nameserver."
                              },
                              "password" : {
                                 "optional" : 1,
                                 "type" : "string",
                                 "description" : "Sets root password inside container."
                              },
                              "onboot" : {
                                 "optional" : 1,
                                 "type" : "boolean",
                                 "default" : 0,
                                 "description" : "Specifies whether a VM will be started during system bootup."
                              },
                              "pool" : {
                                 "format" : "pve-poolid",
                                 "optional" : 1,
                                 "type" : "string",
                                 "description" : "Add the VM to the specified pool."
                              },
                              "swap" : {
                                 "minimum" : 0,
                                 "optional" : 1,
                                 "type" : "integer",
                                 "default" : 512,
                                 "description" : "Amount of SWAP for the VM in MB."
                              },
                              "ip_address" : {
                                 "optional" : 1,
                                 "type" : "string",
                                 "description" : "Specifies the address the container will be assigned."
                              },
                              "vmid" : {
                                 "minimum" : 1,
                                 "format" : "pve-vmid",
                                 "type" : "integer",
                                 "description" : "The (unique) ID of the VM."
                              },
                              "netif" : {
                                 "format" : "pve-openvz-netif",
                                 "optional" : 1,
                                 "type" : "string",
                                 "description" : "Specifies network interfaces for the container."
                              },
                              "quotaugidlimit" : {
                                 "minimum" : 0,
                                 "optional" : 1,
                                 "type" : "integer",
                                 "default" : 0,
                                 "description" : "Set maximum number of user/group IDs in a container for which disk quota inside the container will be accounted. If this value is set to 0, user and group quotas inside the container will not."
                              },
                              "description" : {
                                 "optional" : 1,
                                 "type" : "string",
                                 "description" : "Container description. Only used on the configuration web interface."
                              },
                              "force" : {
                                 "optional" : 1,
                                 "type" : "boolean",
                                 "description" : "Allow to overwrite existing container."
                              },
                              "memory" : {
                                 "minimum" : 16,
                                 "optional" : 1,
                                 "type" : "integer",
                                 "default" : 512,
                                 "description" : "Amount of RAM for the VM in MB."
                              },
                              "cpuunits" : {
                                 "minimum" : 0,
                                 "maximum" : 500000,
                                 "optional" : 1,
                                 "type" : "integer",
                                 "default" : 1000,
                                 "description" : "CPU weight for a VM. Argument is used in the kernel fair scheduler. The larger the number is, the more CPU time this VM gets. Number is relative to weights of all the other running VMs.\n\nNOTE: You can disable fair-scheduler configuration by setting this to 0."
                              },
                              "quotatime" : {
                                 "minimum" : 0,
                                 "optional" : 1,
                                 "type" : "integer",
                                 "default" : 0,
                                 "description" : "Set quota grace period (seconds)."
                              },
                              "storage" : {
                                 "format" : "pve-storage-id",
                                 "default" : "local",
                                 "optional" : 1,
                                 "type" : "string",
                                 "description" : "Target storage."
                              },
                              "cpus" : {
                                 "minimum" : 1,
                                 "optional" : 1,
                                 "type" : "integer",
                                 "default" : 1,
                                 "description" : "The number of CPUs for this container."
                              }
                           }
                        },
                        "method" : "POST",
                        "proxyto" : "node"
                     },
                     "GET" : {
                        "permissions" : {
                           "user" : "all",
                           "description" : "Only list VMs where you have VM.Audit permissons on /vms/<vmid>."
                        },
                        "returns" : {
                           "type" : "array",
                           "items" : {
                              "type" : "object",
                              "properties" : {}
                           },
                           "links" : [
                              {
                                 "rel" : "child",
                                 "href" : "{vmid}"
                              }
                           ]
                        },
                        "name" : "vmlist",
                        "protected" : 1,
                        "description" : "OpenVZ container index (per node).",
                        "parameters" : {
                           "additionalProperties" : 0,
                           "properties" : {
                              "node" : {
                                 "format" : "pve-node",
                                 "type" : "string",
                                 "description" : "The cluster node name."
                              }
                           }
                        },
                        "method" : "GET",
                        "proxyto" : "node"
                     }
                  },
                  "text" : "openvz",
                  "children" : [
                     {
                        "info" : {
                           "DELETE" : {
                              "permissions" : {
                                 "check" : [
                                    "perm",
                                    "/vms/{vmid}",
                                    [
                                       "VM.Allocate"
                                    ]
                                 ]
                              },
                              "returns" : {
                                 "type" : "string"
                              },
                              "name" : "destroy_vm",
                              "protected" : 1,
                              "description" : "Destroy the container (also delete all uses files).",
                              "parameters" : {
                                 "additionalProperties" : 0,
                                 "properties" : {
                                    "node" : {
                                       "format" : "pve-node",
                                       "type" : "string",
                                       "description" : "The cluster node name."
                                    },
                                    "vmid" : {
                                       "minimum" : 1,
                                       "format" : "pve-vmid",
                                       "type" : "integer",
                                       "description" : "The (unique) ID of the VM."
                                    }
                                 }
                              },
                              "method" : "DELETE",
                              "proxyto" : "node"
                           },
                           "GET" : {
                              "parameters" : {
                                 "additionalProperties" : 0,
                                 "properties" : {
                                    "node" : {
                                       "format" : "pve-node",
                                       "type" : "string",
                                       "description" : "The cluster node name."
                                    },
                                    "vmid" : {
                                       "minimum" : 1,
                                       "format" : "pve-vmid",
                                       "type" : "integer",
                                       "description" : "The (unique) ID of the VM."
                                    }
                                 }
                              },
                              "permissions" : {
                                 "user" : "all"
                              },
                              "returns" : {
                                 "type" : "array",
                                 "items" : {
                                    "type" : "object",
                                    "properties" : {
                                       "subdir" : {
                                          "type" : "string"
                                       }
                                    }
                                 },
                                 "links" : [
                                    {
                                       "rel" : "child",
                                       "href" : "{subdir}"
                                    }
                                 ]
                              },
                              "name" : "vmdiridx",
                              "proxyto" : "node",
                              "method" : "GET",
                              "description" : "Directory index"
                           }
                        },
                        "text" : "{vmid}",
                        "children" : [
                           {
                              "info" : {
                                 "GET" : {
                                    "parameters" : {
                                       "additionalProperties" : 0,
                                       "properties" : {
                                          "node" : {
                                             "format" : "pve-node",
                                             "type" : "string",
                                             "description" : "The cluster node name."
                                          },
                                          "vmid" : {
                                             "minimum" : 1,
                                             "format" : "pve-vmid",
                                             "type" : "integer",
                                             "description" : "The (unique) ID of the VM."
                                          }
                                       }
                                    },
                                    "permissions" : {
                                       "check" : [
                                          "perm",
                                          "/vms/{vmid}",
                                          [
                                             "VM.Audit"
                                          ]
                                       ]
                                    },
                                    "returns" : {
                                       "type" : "object",
                                       "properties" : {
                                          "digest" : {
                                             "type" : "string",
                                             "description" : "SHA1 digest of configuration file. This can be used to prevent concurrent modifications."
                                          }
                                       }
                                    },
                                    "name" : "vm_config",
                                    "proxyto" : "node",
                                    "method" : "GET",
                                    "description" : "Get container configuration."
                                 },
                                 "PUT" : {
                                    "permissions" : {
                                       "check" : [
                                          "perm",
                                          "/vms/{vmid}",
                                          [
                                             "VM.Config.Disk",
                                             "VM.Config.CPU",
                                             "VM.Config.Memory",
                                             "VM.Config.Network",
                                             "VM.Config.Options"
                                          ],
                                          "any",
                                          1
                                       ]
                                    },
                                    "returns" : {
                                       "type" : "null"
                                    },
                                    "name" : "update_vm",
                                    "protected" : 1,
                                    "description" : "Set virtual machine options.",
                                    "parameters" : {
                                       "additionalProperties" : 0,
                                       "properties" : {
                                          "disk" : {
                                             "minimum" : 0,
                                             "optional" : 1,
                                             "type" : "number",
                                             "default" : 2,
                                             "description" : "Amount of disk space for the VM in GB. A zero indicates no limits."
                                          },
                                          "hostname" : {
                                             "maxLength" : 255,
                                             "optional" : 1,
                                             "type" : "string",
                                             "description" : "Set a host name for the container."
                                          },
                                          "node" : {
                                             "format" : "pve-node",
                                             "type" : "string",
                                             "description" : "The cluster node name."
                                          },
                                          "nameserver" : {
                                             "optional" : 1,
                                             "type" : "string",
                                             "description" : "Sets DNS server IP address for a container. Create will automatically use the setting from the host if you neither set searchdomain or nameserver."
                                          },
                                          "searchdomain" : {
                                             "optional" : 1,
                                             "type" : "string",
                                             "description" : "Sets DNS search domains for a container. Create will automatically use the setting from the host if you neither set searchdomain or nameserver."
                                          },
                                          "onboot" : {
                                             "optional" : 1,
                                             "type" : "boolean",
                                             "default" : 0,
                                             "description" : "Specifies whether a VM will be started during system bootup."
                                          },
                                          "swap" : {
                                             "minimum" : 0,
                                             "optional" : 1,
                                             "type" : "integer",
                                             "default" : 512,
                                             "description" : "Amount of SWAP for the VM in MB."
                                          },
                                          "ip_address" : {
                                             "optional" : 1,
                                             "type" : "string",
                                             "description" : "Specifies the address the container will be assigned."
                                          },
                                          "vmid" : {
                                             "minimum" : 1,
                                             "format" : "pve-vmid",
                                             "type" : "integer",
                                             "description" : "The (unique) ID of the VM."
                                          },
                                          "netif" : {
                                             "format" : "pve-openvz-netif",
                                             "optional" : 1,
                                             "type" : "string",
                                             "description" : "Specifies network interfaces for the container."
                                          },
                                          "quotaugidlimit" : {
                                             "minimum" : 0,
                                             "optional" : 1,
                                             "type" : "integer",
                                             "default" : 0,
                                             "description" : "Set maximum number of user/group IDs in a container for which disk quota inside the container will be accounted. If this value is set to 0, user and group quotas inside the container will not."
                                          },
                                          "description" : {
                                             "optional" : 1,
                                             "type" : "string",
                                             "description" : "Container description. Only used on the configuration web interface."
                                          },
                                          "memory" : {
                                             "minimum" : 16,
                                             "optional" : 1,
                                             "type" : "integer",
                                             "default" : 512,
                                             "description" : "Amount of RAM for the VM in MB."
                                          },
                                          "cpuunits" : {
                                             "minimum" : 0,
                                             "maximum" : 500000,
                                             "optional" : 1,
                                             "type" : "integer",
                                             "default" : 1000,
                                             "description" : "CPU weight for a VM. Argument is used in the kernel fair scheduler. The larger the number is, the more CPU time this VM gets. Number is relative to weights of all the other running VMs.\n\nNOTE: You can disable fair-scheduler configuration by setting this to 0."
                                          },
                                          "digest" : {
                                             "maxLength" : 40,
                                             "type" : "string",
                                             "optional" : 1,
                                             "description" : "Prevent changes if current configuration file has different SHA1 digest. This can be used to prevent concurrent modifications."
                                          },
                                          "quotatime" : {
                                             "minimum" : 0,
                                             "optional" : 1,
                                             "type" : "integer",
                                             "default" : 0,
                                             "description" : "Set quota grace period (seconds)."
                                          },
                                          "cpus" : {
                                             "minimum" : 1,
                                             "optional" : 1,
                                             "type" : "integer",
                                             "default" : 1,
                                             "description" : "The number of CPUs for this container."
                                          }
                                       }
                                    },
                                    "method" : "PUT",
                                    "proxyto" : "node"
                                 }
                              },
                              "text" : "config",
                              "path" : "/nodes/{node}/openvz/{vmid}/config",
                              "leaf" : 1
                           },
                           {
                              "info" : {
                                 "GET" : {
                                    "parameters" : {
                                       "additionalProperties" : 0,
                                       "properties" : {
                                          "timeframe" : {
                                             "enum" : [
                                                "hour",
                                                "day",
                                                "week",
                                                "month",
                                                "year"
                                             ],
                                             "type" : "string",
                                             "description" : "Specify the time frame you are interested in."
                                          },
                                          "cf" : {
                                             "enum" : [
                                                "AVERAGE",
                                                "MAX"
                                             ],
                                             "type" : "string",
                                             "optional" : 1,
                                             "description" : "The RRD consolidation function"
                                          },
                                          "node" : {
                                             "format" : "pve-node",
                                             "type" : "string",
                                             "description" : "The cluster node name."
                                          },
                                          "vmid" : {
                                             "minimum" : 1,
                                             "format" : "pve-vmid",
                                             "type" : "integer",
                                             "description" : "The (unique) ID of the VM."
                                          },
                                          "ds" : {
                                             "format" : "pve-configid-list",
                                             "type" : "string",
                                             "description" : "The list of datasources you want to display."
                                          }
                                       }
                                    },
                                    "permissions" : {
                                       "check" : [
                                          "perm",
                                          "/vms/{vmid}",
                                          [
                                             "VM.Audit"
                                          ]
                                       ]
                                    },
                                    "returns" : {
                                       "type" : "object",
                                       "properties" : {
                                          "filename" : {
                                             "type" : "string"
                                          }
                                       }
                                    },
                                    "name" : "rrd",
                                    "protected" : 1,
                                    "method" : "GET",
                                    "description" : "Read VM RRD statistics (returns PNG)"
                                 }
                              },
                              "text" : "rrd",
                              "path" : "/nodes/{node}/openvz/{vmid}/rrd",
                              "leaf" : 1
                           },
                           {
                              "info" : {
                                 "GET" : {
                                    "parameters" : {
                                       "additionalProperties" : 0,
                                       "properties" : {
                                          "timeframe" : {
                                             "enum" : [
                                                "hour",
                                                "day",
                                                "week",
                                                "month",
                                                "year"
                                             ],
                                             "type" : "string",
                                             "description" : "Specify the time frame you are interested in."
                                          },
                                          "cf" : {
                                             "enum" : [
                                                "AVERAGE",
                                                "MAX"
                                             ],
                                             "type" : "string",
                                             "optional" : 1,
                                             "description" : "The RRD consolidation function"
                                          },
                                          "node" : {
                                             "format" : "pve-node",
                                             "type" : "string",
                                             "description" : "The cluster node name."
                                          },
                                          "vmid" : {
                                             "minimum" : 1,
                                             "format" : "pve-vmid",
                                             "type" : "integer",
                                             "description" : "The (unique) ID of the VM."
                                          }
                                       }
                                    },
                                    "permissions" : {
                                       "check" : [
                                          "perm",
                                          "/vms/{vmid}",
                                          [
                                             "VM.Audit"
                                          ]
                                       ]
                                    },
                                    "returns" : {
                                       "type" : "array",
                                       "items" : {
                                          "type" : "object",
                                          "properties" : {}
                                       }
                                    },
                                    "name" : "rrddata",
                                    "protected" : 1,
                                    "method" : "GET",
                                    "description" : "Read VM RRD statistics"
                                 }
                              },
                              "text" : "rrddata",
                              "path" : "/nodes/{node}/openvz/{vmid}/rrddata",
                              "leaf" : 1
                           },
                           {
                              "info" : {
                                 "GET" : {
                                    "permissions" : {
                                       "check" : [
                                          "perm",
                                          "/vms/{vmid}",
                                          [
                                             "VM.Audit"
                                          ]
                                       ]
                                    },
                                    "returns" : {
                                       "type" : "array",
                                       "items" : {
                                          "type" : "object",
                                          "properties" : {
                                             "n" : {
                                                "type" : "integer",
                                                "description" : "Line number"
                                             },
                                             "t" : {
                                                "type" : "string",
                                                "description" : "Line text"
                                             }
                                          }
                                       }
                                    },
                                    "name" : "initlog",
                                    "protected" : 1,
                                    "description" : "Read init log.",
                                    "parameters" : {
                                       "additionalProperties" : 0,
                                       "properties" : {
                                          "limit" : {
                                             "minimum" : 0,
                                             "type" : "integer",
                                             "optional" : 1
                                          },
                                          "node" : {
                                             "format" : "pve-node",
                                             "type" : "string",
                                             "description" : "The cluster node name."
                                          },
                                          "vmid" : {
                                             "minimum" : 1,
                                             "format" : "pve-vmid",
                                             "type" : "integer",
                                             "description" : "The (unique) ID of the VM."
                                          },
                                          "start" : {
                                             "minimum" : 0,
                                             "type" : "integer",
                                             "optional" : 1
                                          }
                                       }
                                    },
                                    "method" : "GET",
                                    "proxyto" : "node"
                                 }
                              },
                              "text" : "initlog",
                              "path" : "/nodes/{node}/openvz/{vmid}/initlog",
                              "leaf" : 1
                           },
                           {
                              "info" : {
                                 "POST" : {
                                    "parameters" : {
                                       "additionalProperties" : 0,
                                       "properties" : {
                                          "node" : {
                                             "format" : "pve-node",
                                             "type" : "string",
                                             "description" : "The cluster node name."
                                          },
                                          "vmid" : {
                                             "minimum" : 1,
                                             "format" : "pve-vmid",
                                             "type" : "integer",
                                             "description" : "The (unique) ID of the VM."
                                          }
                                       }
                                    },
                                    "permissions" : {
                                       "check" : [
                                          "perm",
                                          "/vms/{vmid}",
                                          [
                                             "VM.Console"
                                          ]
                                       ]
                                    },
                                    "returns" : {
                                       "additionalProperties" : 0,
                                       "properties" : {
                                          "cert" : {
                                             "type" : "string"
                                          },
                                          "user" : {
                                             "type" : "string"
                                          },
                                          "upid" : {
                                             "type" : "string"
                                          },
                                          "ticket" : {
                                             "type" : "string"
                                          },
                                          "port" : {
                                             "type" : "integer"
                                          }
                                       }
                                    },
                                    "name" : "vncproxy",
                                    "protected" : 1,
                                    "method" : "POST",
                                    "description" : "Creates a TCP VNC proxy connections."
                                 }
                              },
                              "text" : "vncproxy",
                              "path" : "/nodes/{node}/openvz/{vmid}/vncproxy",
                              "leaf" : 1
                           },
                           {
                              "info" : {
                                 "GET" : {
                                    "parameters" : {
                                       "additionalProperties" : 0,
                                       "properties" : {
                                          "node" : {
                                             "format" : "pve-node",
                                             "type" : "string",
                                             "description" : "The cluster node name."
                                          },
                                          "vmid" : {
                                             "minimum" : 1,
                                             "format" : "pve-vmid",
                                             "type" : "integer",
                                             "description" : "The (unique) ID of the VM."
                                          }
                                       }
                                    },
                                    "permissions" : {
                                       "user" : "all"
                                    },
                                    "returns" : {
                                       "type" : "array",
                                       "items" : {
                                          "type" : "object",
                                          "properties" : {
                                             "subdir" : {
                                                "type" : "string"
                                             }
                                          }
                                       },
                                       "links" : [
                                          {
                                             "rel" : "child",
                                             "href" : "{subdir}"
                                          }
                                       ]
                                    },
                                    "name" : "vmcmdidx",
                                    "proxyto" : "node",
                                    "method" : "GET",
                                    "description" : "Directory index"
                                 }
                              },
                              "text" : "status",
                              "children" : [
                                 {
                                    "info" : {
                                       "GET" : {
                                          "permissions" : {
                                             "check" : [
                                                "perm",
                                                "/vms/{vmid}",
                                                [
                                                   "VM.Audit"
                                                ]
                                             ]
                                          },
                                          "returns" : {
                                             "type" : "object"
                                          },
                                          "name" : "vm_status",
                                          "protected" : 1,
                                          "description" : "Get virtual machine status.",
                                          "parameters" : {
                                             "additionalProperties" : 0,
                                             "properties" : {
                                                "node" : {
                                                   "format" : "pve-node",
                                                   "type" : "string",
                                                   "description" : "The cluster node name."
                                                },
                                                "vmid" : {
                                                   "minimum" : 1,
                                                   "format" : "pve-vmid",
                                                   "type" : "integer",
                                                   "description" : "The (unique) ID of the VM."
                                                }
                                             }
                                          },
                                          "method" : "GET",
                                          "proxyto" : "node"
                                       }
                                    },
                                    "text" : "current",
                                    "path" : "/nodes/{node}/openvz/{vmid}/status/current",
                                    "leaf" : 1
                                 },
                                 {
                                    "info" : {
                                       "GET" : {
                                          "permissions" : {
                                             "check" : [
                                                "perm",
                                                "/vms/{vmid}",
                                                [
                                                   "VM.Audit"
                                                ]
                                             ]
                                          },
                                          "returns" : {
                                             "type" : "array",
                                             "items" : {
                                                "type" : "object",
                                                "properties" : {
                                                   "bar" : {
                                                      "type" : "number"
                                                   },
                                                   "lim" : {
                                                      "type" : "number"
                                                   },
                                                   "held" : {
                                                      "type" : "number"
                                                   },
                                                   "id" : {
                                                      "type" : "string"
                                                   },
                                                   "failcnt" : {
                                                      "type" : "number"
                                                   },
                                                   "maxheld" : {
                                                      "type" : "number"
                                                   }
                                                }
                                             }
                                          },
                                          "name" : "vm_user_beancounters",
                                          "protected" : 1,
                                          "description" : "Get container user_beancounters.",
                                          "parameters" : {
                                             "additionalProperties" : 0,
                                             "properties" : {
                                                "node" : {
                                                   "format" : "pve-node",
                                                   "type" : "string",
                                                   "description" : "The cluster node name."
                                                },
                                                "vmid" : {
                                                   "minimum" : 1,
                                                   "format" : "pve-vmid",
                                                   "type" : "integer",
                                                   "description" : "The (unique) ID of the VM."
                                                }
                                             }
                                          },
                                          "method" : "GET",
                                          "proxyto" : "node"
                                       }
                                    },
                                    "text" : "ubc",
                                    "path" : "/nodes/{node}/openvz/{vmid}/status/ubc",
                                    "leaf" : 1
                                 },
                                 {
                                    "info" : {
                                       "POST" : {
                                          "permissions" : {
                                             "check" : [
                                                "perm",
                                                "/vms/{vmid}",
                                                [
                                                   "VM.PowerMgmt"
                                                ]
                                             ]
                                          },
                                          "returns" : {
                                             "type" : "string"
                                          },
                                          "name" : "vm_start",
                                          "protected" : 1,
                                          "description" : "Start the container.",
                                          "parameters" : {
                                             "additionalProperties" : 0,
                                             "properties" : {
                                                "node" : {
                                                   "format" : "pve-node",
                                                   "type" : "string",
                                                   "description" : "The cluster node name."
                                                },
                                                "vmid" : {
                                                   "minimum" : 1,
                                                   "format" : "pve-vmid",
                                                   "type" : "integer",
                                                   "description" : "The (unique) ID of the VM."
                                                }
                                             }
                                          },
                                          "method" : "POST",
                                          "proxyto" : "node"
                                       }
                                    },
                                    "text" : "start",
                                    "path" : "/nodes/{node}/openvz/{vmid}/status/start",
                                    "leaf" : 1
                                 },
                                 {
                                    "info" : {
                                       "POST" : {
                                          "permissions" : {
                                             "check" : [
                                                "perm",
                                                "/vms/{vmid}",
                                                [
                                                   "VM.PowerMgmt"
                                                ]
                                             ]
                                          },
                                          "returns" : {
                                             "type" : "string"
                                          },
                                          "name" : "vm_stop",
                                          "protected" : 1,
                                          "description" : "Stop the container.",
                                          "parameters" : {
                                             "additionalProperties" : 0,
                                             "properties" : {
                                                "node" : {
                                                   "format" : "pve-node",
                                                   "type" : "string",
                                                   "description" : "The cluster node name."
                                                },
                                                "vmid" : {
                                                   "minimum" : 1,
                                                   "format" : "pve-vmid",
                                                   "type" : "integer",
                                                   "description" : "The (unique) ID of the VM."
                                                }
                                             }
                                          },
                                          "method" : "POST",
                                          "proxyto" : "node"
                                       }
                                    },
                                    "text" : "stop",
                                    "path" : "/nodes/{node}/openvz/{vmid}/status/stop",
                                    "leaf" : 1
                                 },
                                 {
                                    "info" : {
                                       "POST" : {
                                          "permissions" : {
                                             "check" : [
                                                "perm",
                                                "/vms/{vmid}",
                                                [
                                                   "VM.PowerMgmt"
                                                ]
                                             ]
                                          },
                                          "returns" : {
                                             "type" : "string"
                                          },
                                          "name" : "vm_mount",
                                          "protected" : 1,
                                          "description" : "Mounts container private area.",
                                          "parameters" : {
                                             "additionalProperties" : 0,
                                             "properties" : {
                                                "node" : {
                                                   "format" : "pve-node",
                                                   "type" : "string",
                                                   "description" : "The cluster node name."
                                                },
                                                "vmid" : {
                                                   "minimum" : 1,
                                                   "format" : "pve-vmid",
                                                   "type" : "integer",
                                                   "description" : "The (unique) ID of the VM."
                                                }
                                             }
                                          },
                                          "method" : "POST",
                                          "proxyto" : "node"
                                       }
                                    },
                                    "text" : "mount",
                                    "path" : "/nodes/{node}/openvz/{vmid}/status/mount",
                                    "leaf" : 1
                                 },
                                 {
                                    "info" : {
                                       "POST" : {
                                          "permissions" : {
                                             "check" : [
                                                "perm",
                                                "/vms/{vmid}",
                                                [
                                                   "VM.PowerMgmt"
                                                ]
                                             ]
                                          },
                                          "returns" : {
                                             "type" : "string"
                                          },
                                          "name" : "vm_umount",
                                          "protected" : 1,
                                          "description" : "Unmounts container private area.",
                                          "parameters" : {
                                             "additionalProperties" : 0,
                                             "properties" : {
                                                "node" : {
                                                   "format" : "pve-node",
                                                   "type" : "string",
                                                   "description" : "The cluster node name."
                                                },
                                                "vmid" : {
                                                   "minimum" : 1,
                                                   "format" : "pve-vmid",
                                                   "type" : "integer",
                                                   "description" : "The (unique) ID of the VM."
                                                }
                                             }
                                          },
                                          "method" : "POST",
                                          "proxyto" : "node"
                                       }
                                    },
                                    "text" : "umount",
                                    "path" : "/nodes/{node}/openvz/{vmid}/status/umount",
                                    "leaf" : 1
                                 },
                                 {
                                    "info" : {
                                       "POST" : {
                                          "permissions" : {
                                             "check" : [
                                                "perm",
                                                "/vms/{vmid}",
                                                [
                                                   "VM.PowerMgmt"
                                                ]
                                             ]
                                          },
                                          "returns" : {
                                             "type" : "string"
                                          },
                                          "name" : "vm_shutdown",
                                          "protected" : 1,
                                          "description" : "Shutdown the container.",
                                          "parameters" : {
                                             "additionalProperties" : 0,
                                             "properties" : {
                                                "timeout" : {
                                                   "minimum" : 0,
                                                   "type" : "integer",
                                                   "optional" : 1,
                                                   "default" : 60,
                                                   "description" : "Wait maximal timeout seconds."
                                                },
                                                "forceStop" : {
                                                   "type" : "boolean",
                                                   "optional" : 1,
                                                   "default" : 0,
                                                   "description" : "Make sure the Container stops."
                                                },
                                                "node" : {
                                                   "format" : "pve-node",
                                                   "type" : "string",
                                                   "description" : "The cluster node name."
                                                },
                                                "vmid" : {
                                                   "minimum" : 1,
                                                   "format" : "pve-vmid",
                                                   "type" : "integer",
                                                   "description" : "The (unique) ID of the VM."
                                                }
                                             }
                                          },
                                          "method" : "POST",
                                          "proxyto" : "node"
                                       }
                                    },
                                    "text" : "shutdown",
                                    "path" : "/nodes/{node}/openvz/{vmid}/status/shutdown",
                                    "leaf" : 1
                                 }
                              ],
                              "path" : "/nodes/{node}/openvz/{vmid}/status",
                              "leaf" : 0
                           },
                           {
                              "info" : {
                                 "POST" : {
                                    "permissions" : {
                                       "check" : [
                                          "perm",
                                          "/vms/{vmid}",
                                          [
                                             "VM.Migrate"
                                          ]
                                       ]
                                    },
                                    "returns" : {
                                       "type" : "string",
                                       "description" : "the task ID."
                                    },
                                    "name" : "migrate_vm",
                                    "protected" : 1,
                                    "description" : "Migrate the container to another node. Creates a new migration task.",
                                    "parameters" : {
                                       "additionalProperties" : 0,
                                       "properties" : {
                                          "target" : {
                                             "format" : "pve-node",
                                             "type" : "string",
                                             "description" : "Target node."
                                          },
                                          "node" : {
                                             "format" : "pve-node",
                                             "type" : "string",
                                             "description" : "The cluster node name."
                                          },
                                          "vmid" : {
                                             "minimum" : 1,
                                             "format" : "pve-vmid",
                                             "type" : "integer",
                                             "description" : "The (unique) ID of the VM."
                                          },
                                          "online" : {
                                             "type" : "boolean",
                                             "optional" : 1,
                                             "description" : "Use online/live migration."
                                          }
                                       }
                                    },
                                    "method" : "POST",
                                    "proxyto" : "node"
                                 }
                              },
                              "text" : "migrate",
                              "path" : "/nodes/{node}/openvz/{vmid}/migrate",
                              "leaf" : 1
                           }
                        ],
                        "path" : "/nodes/{node}/openvz/{vmid}",
                        "leaf" : 0
                     }
                  ],
                  "path" : "/nodes/{node}/openvz",
                  "leaf" : 0
               },
               {
                  "info" : {
                     "POST" : {
                        "permissions" : {
                           "user" : "all",
                           "description" : "The user needs 'VM.Backup' permissions on any VM, and 'Datastore.AllocateSpace' on the backup storage."
                        },
                        "returns" : {
                           "type" : "string"
                        },
                        "name" : "vzdump",
                        "protected" : 1,
                        "description" : "Create backup.",
                        "parameters" : {
                           "additionalProperties" : 0,
                           "properties" : {
                              "bwlimit" : {
                                 "minimum" : 0,
                                 "type" : "integer",
                                 "optional" : 1,
                                 "description" : "Limit I/O bandwidth (KBytes per second)."
                              },
                              "remove" : {
                                 "type" : "boolean",
                                 "optional" : 1,
                                 "default" : 1,
                                 "description" : "Remove old backup files if there are more than 'maxfiles' backup files."
                              },
                              "dumpdir" : {
                                 "type" : "string",
                                 "optional" : 1,
                                 "description" : "Store resulting files to specified directory."
                              },
                              "tmpdir" : {
                                 "type" : "string",
                                 "optional" : 1,
                                 "description" : "Store temporary files to specified directory."
                              },
                              "stopwait" : {
                                 "minimum" : 0,
                                 "type" : "integer",
                                 "optional" : 1,
                                 "description" : "Maximal time to wait until a VM is stopped (minutes)."
                              },
                              "mode" : {
                                 "enum" : [
                                    "snapshot",
                                    "suspend",
                                    "stop"
                                 ],
                                 "type" : "string",
                                 "optional" : 1,
                                 "default" : "stop",
                                 "description" : "Backup mode."
                              },
                              "all" : {
                                 "type" : "boolean",
                                 "optional" : 1,
                                 "default" : 0,
                                 "description" : "Backup all known VMs on this host."
                              },
                              "node" : {
                                 "format" : "pve-node",
                                 "optional" : 1,
                                 "type" : "string",
                                 "description" : "Only run if executed on this node."
                              },
                              "size" : {
                                 "minimum" : 500,
                                 "type" : "integer",
                                 "optional" : 1,
                                 "description" : "LVM snapshot size im MB."
                              },
                              "maxfiles" : {
                                 "minimum" : 1,
                                 "type" : "integer",
                                 "optional" : 1,
                                 "description" : "Maximal number of backup files per VM."
                              },
                              "stdout" : {
                                 "type" : "boolean",
                                 "optional" : 1,
                                 "description" : "Write tar to stdout, not to a file."
                              },
                              "vmid" : {
                                 "format" : "pve-vmid-list",
                                 "type" : "string",
                                 "optional" : 1,
                                 "description" : "The ID of the VM you want to backup."
                              },
                              "stdexcludes" : {
                                 "type" : "boolean",
                                 "optional" : 1,
                                 "default" : 1,
                                 "description" : "Exclude temorary files and logs."
                              },
                              "quiet" : {
                                 "type" : "boolean",
                                 "optional" : 1,
                                 "default" : 0,
                                 "description" : "Be quiet."
                              },
                              "script" : {
                                 "type" : "string",
                                 "optional" : 1,
                                 "description" : "Use specified hook script."
                              },
                              "mailto" : {
                                 "format" : "string-list",
                                 "type" : "string",
                                 "optional" : 1,
                                 "description" : ""
                              },
                              "ionice" : {
                                 "minimum" : 0,
                                 "maximum" : 8,
                                 "type" : "integer",
                                 "optional" : 1,
                                 "description" : "Set CFQ ionice priority."
                              },
                              "exclude-path" : {
                                 "format" : "string-alist",
                                 "type" : "string",
                                 "optional" : 1,
                                 "description" : "exclude certain files/directories (regex)."
                              },
                              "lockwait" : {
                                 "minimum" : 0,
                                 "type" : "integer",
                                 "optional" : 1,
                                 "description" : "Maximal time to wait for the global lock (minutes)."
                              },
                              "compress" : {
                                 "enum" : [
                                    "0",
                                    "1",
                                    "gzip",
                                    "lzo"
                                 ],
                                 "type" : "string",
                                 "optional" : 1,
                                 "default" : "lzo",
                                 "description" : "Compress dump file."
                              },
                              "storage" : {
                                 "format" : "pve-storage-id",
                                 "optional" : 1,
                                 "type" : "string",
                                 "description" : "Store resulting file to this storage."
                              },
                              "exclude" : {
                                 "format" : "pve-vmid-list",
                                 "type" : "string",
                                 "optional" : 1,
                                 "description" : "exclude specified VMs (assumes --all)"
                              }
                           }
                        },
                        "method" : "POST",
                        "proxyto" : "node"
                     }
                  },
                  "text" : "vzdump",
                  "path" : "/nodes/{node}/vzdump",
                  "leaf" : 1
               },
               {
                  "info" : {
                     "GET" : {
                        "permissions" : {
                           "check" : [
                              "perm",
                              "/nodes/{node}",
                              [
                                 "Sys.Audit"
                              ]
                           ]
                        },
                        "returns" : {
                           "type" : "array",
                           "items" : {
                              "type" : "object",
                              "properties" : {}
                           },
                           "links" : [
                              {
                                 "rel" : "child",
                                 "href" : "{service}"
                              }
                           ]
                        },
                        "name" : "index",
                        "protected" : 1,
                        "description" : "Service list.",
                        "parameters" : {
                           "additionalProperties" : 0,
                           "properties" : {
                              "node" : {
                                 "format" : "pve-node",
                                 "type" : "string",
                                 "description" : "The cluster node name."
                              }
                           }
                        },
                        "method" : "GET",
                        "proxyto" : "node"
                     }
                  },
                  "text" : "services",
                  "children" : [
                     {
                        "info" : {
                           "GET" : {
                              "parameters" : {
                                 "additionalProperties" : 0,
                                 "properties" : {
                                    "node" : {
                                       "format" : "pve-node",
                                       "type" : "string",
                                       "description" : "The cluster node name."
                                    },
                                    "service" : {
                                       "enum" : [
                                          "pvecluster",
                                          "postfix",
                                          "pvedaemon",
                                          "cron",
                                          "corosync",
                                          "pveproxy",
                                          "ntpd",
                                          "syslog",
                                          "rgmanager",
                                          "sshd"
                                       ],
                                       "type" : "string",
                                       "description" : "Service ID"
                                    }
                                 }
                              },
                              "permissions" : {
                                 "check" : [
                                    "perm",
                                    "/nodes/{node}",
                                    [
                                       "Sys.Audit"
                                    ]
                                 ]
                              },
                              "returns" : {
                                 "type" : "array",
                                 "items" : {
                                    "type" : "object",
                                    "properties" : {
                                       "subdir" : {
                                          "type" : "string"
                                       }
                                    }
                                 },
                                 "links" : [
                                    {
                                       "rel" : "child",
                                       "href" : "{subdir}"
                                    }
                                 ]
                              },
                              "name" : "srvcmdidx",
                              "method" : "GET",
                              "description" : "Directory index"
                           }
                        },
                        "text" : "{service}",
                        "children" : [
                           {
                              "info" : {
                                 "GET" : {
                                    "permissions" : {
                                       "check" : [
                                          "perm",
                                          "/nodes/{node}",
                                          [
                                             "Sys.Audit"
                                          ]
                                       ]
                                    },
                                    "returns" : {
                                       "type" : "object",
                                       "properties" : {}
                                    },
                                    "name" : "service_state",
                                    "protected" : 1,
                                    "description" : "Read service properties",
                                    "parameters" : {
                                       "additionalProperties" : 0,
                                       "properties" : {
                                          "node" : {
                                             "format" : "pve-node",
                                             "type" : "string",
                                             "description" : "The cluster node name."
                                          },
                                          "service" : {
                                             "enum" : [
                                                "pvecluster",
                                                "postfix",
                                                "pvedaemon",
                                                "cron",
                                                "corosync",
                                                "pveproxy",
                                                "ntpd",
                                                "syslog",
                                                "rgmanager",
                                                "sshd"
                                             ],
                                             "type" : "string",
                                             "description" : "Service ID"
                                          }
                                       }
                                    },
                                    "method" : "GET",
                                    "proxyto" : "node"
                                 }
                              },
                              "text" : "state",
                              "path" : "/nodes/{node}/services/{service}/state",
                              "leaf" : 1
                           },
                           {
                              "info" : {
                                 "POST" : {
                                    "permissions" : {
                                       "check" : [
                                          "perm",
                                          "/nodes/{node}",
                                          [
                                             "Sys.Modify"
                                          ]
                                       ]
                                    },
                                    "returns" : {
                                       "type" : "string"
                                    },
                                    "name" : "service_start",
                                    "protected" : 1,
                                    "description" : "Start service.",
                                    "parameters" : {
                                       "additionalProperties" : 0,
                                       "properties" : {
                                          "node" : {
                                             "format" : "pve-node",
                                             "type" : "string",
                                             "description" : "The cluster node name."
                                          },
                                          "service" : {
                                             "enum" : [
                                                "pvecluster",
                                                "postfix",
                                                "pvedaemon",
                                                "cron",
                                                "corosync",
                                                "pveproxy",
                                                "ntpd",
                                                "syslog",
                                                "rgmanager",
                                                "sshd"
                                             ],
                                             "type" : "string",
                                             "description" : "Service ID"
                                          }
                                       }
                                    },
                                    "method" : "POST",
                                    "proxyto" : "node"
                                 }
                              },
                              "text" : "start",
                              "path" : "/nodes/{node}/services/{service}/start",
                              "leaf" : 1
                           },
                           {
                              "info" : {
                                 "POST" : {
                                    "permissions" : {
                                       "check" : [
                                          "perm",
                                          "/nodes/{node}",
                                          [
                                             "Sys.Modify"
                                          ]
                                       ]
                                    },
                                    "returns" : {
                                       "type" : "string"
                                    },
                                    "name" : "service_stop",
                                    "protected" : 1,
                                    "description" : "Stop service.",
                                    "parameters" : {
                                       "additionalProperties" : 0,
                                       "properties" : {
                                          "node" : {
                                             "format" : "pve-node",
                                             "type" : "string",
                                             "description" : "The cluster node name."
                                          },
                                          "service" : {
                                             "enum" : [
                                                "pvecluster",
                                                "postfix",
                                                "pvedaemon",
                                                "cron",
                                                "corosync",
                                                "pveproxy",
                                                "ntpd",
                                                "syslog",
                                                "rgmanager",
                                                "sshd"
                                             ],
                                             "type" : "string",
                                             "description" : "Service ID"
                                          }
                                       }
                                    },
                                    "method" : "POST",
                                    "proxyto" : "node"
                                 }
                              },
                              "text" : "stop",
                              "path" : "/nodes/{node}/services/{service}/stop",
                              "leaf" : 1
                           },
                           {
                              "info" : {
                                 "POST" : {
                                    "permissions" : {
                                       "check" : [
                                          "perm",
                                          "/nodes/{node}",
                                          [
                                             "Sys.Modify"
                                          ]
                                       ]
                                    },
                                    "returns" : {
                                       "type" : "string"
                                    },
                                    "name" : "service_restart",
                                    "protected" : 1,
                                    "description" : "Restart service.",
                                    "parameters" : {
                                       "additionalProperties" : 0,
                                       "properties" : {
                                          "node" : {
                                             "format" : "pve-node",
                                             "type" : "string",
                                             "description" : "The cluster node name."
                                          },
                                          "service" : {
                                             "enum" : [
                                                "pvecluster",
                                                "postfix",
                                                "pvedaemon",
                                                "cron",
                                                "corosync",
                                                "pveproxy",
                                                "ntpd",
                                                "syslog",
                                                "rgmanager",
                                                "sshd"
                                             ],
                                             "type" : "string",
                                             "description" : "Service ID"
                                          }
                                       }
                                    },
                                    "method" : "POST",
                                    "proxyto" : "node"
                                 }
                              },
                              "text" : "restart",
                              "path" : "/nodes/{node}/services/{service}/restart",
                              "leaf" : 1
                           },
                           {
                              "info" : {
                                 "POST" : {
                                    "permissions" : {
                                       "check" : [
                                          "perm",
                                          "/nodes/{node}",
                                          [
                                             "Sys.Modify"
                                          ]
                                       ]
                                    },
                                    "returns" : {
                                       "type" : "string"
                                    },
                                    "name" : "service_reload",
                                    "protected" : 1,
                                    "description" : "Reload service.",
                                    "parameters" : {
                                       "additionalProperties" : 0,
                                       "properties" : {
                                          "node" : {
                                             "format" : "pve-node",
                                             "type" : "string",
                                             "description" : "The cluster node name."
                                          },
                                          "service" : {
                                             "enum" : [
                                                "pvecluster",
                                                "postfix",
                                                "pvedaemon",
                                                "cron",
                                                "corosync",
                                                "pveproxy",
                                                "ntpd",
                                                "syslog",
                                                "rgmanager",
                                                "sshd"
                                             ],
                                             "type" : "string",
                                             "description" : "Service ID"
                                          }
                                       }
                                    },
                                    "method" : "POST",
                                    "proxyto" : "node"
                                 }
                              },
                              "text" : "reload",
                              "path" : "/nodes/{node}/services/{service}/reload",
                              "leaf" : 1
                           }
                        ],
                        "path" : "/nodes/{node}/services/{service}",
                        "leaf" : 0
                     }
                  ],
                  "path" : "/nodes/{node}/services",
                  "leaf" : 0
               },
               {
                  "info" : {
                     "POST" : {
                        "parameters" : {
                           "additionalProperties" : 0,
                           "properties" : {
                              "node" : {
                                 "format" : "pve-node",
                                 "type" : "string",
                                 "description" : "The cluster node name."
                              },
                              "force" : {
                                 "type" : "boolean",
                                 "optional" : 1,
                                 "default" : 0,
                                 "description" : "Always connect to server, even if we have up to date info inside local cache."
                              }
                           }
                        },
                        "returns" : {
                           "type" : "null"
                        },
                        "name" : "update",
                        "protected" : 1,
                        "proxyto" : "node",
                        "method" : "POST",
                        "description" : "Update subscription info."
                     },
                     "PUT" : {
                        "parameters" : {
                           "additionalProperties" : 0,
                           "properties" : {
                              "node" : {
                                 "format" : "pve-node",
                                 "type" : "string",
                                 "description" : "The cluster node name."
                              },
                              "key" : {
                                 "type" : "string",
                                 "description" : "Proxmox VE subscription key"
                              }
                           }
                        },
                        "returns" : {
                           "type" : "null"
                        },
                        "name" : "set",
                        "protected" : 1,
                        "proxyto" : "node",
                        "method" : "PUT",
                        "description" : "Set subscription key."
                     },
                     "GET" : {
                        "parameters" : {
                           "additionalProperties" : 0,
                           "properties" : {
                              "node" : {
                                 "format" : "pve-node",
                                 "type" : "string",
                                 "description" : "The cluster node name."
                              }
                           }
                        },
                        "permissions" : {
                           "user" : "all"
                        },
                        "returns" : {
                           "type" : "object"
                        },
                        "name" : "get",
                        "proxyto" : "node",
                        "method" : "GET",
                        "description" : "Read subscription info."
                     }
                  },
                  "text" : "subscription",
                  "path" : "/nodes/{node}/subscription",
                  "leaf" : 1
               },
               {
                  "info" : {
                     "DELETE" : {
                        "permissions" : {
                           "check" : [
                              "perm",
                              "/nodes/{node}",
                              [
                                 "Sys.Modify"
                              ]
                           ]
                        },
                        "returns" : {
                           "type" : "null"
                        },
                        "name" : "revert_network_changes",
                        "protected" : 1,
                        "description" : "Revert network configuration changes.",
                        "parameters" : {
                           "additionalProperties" : 0,
                           "properties" : {
                              "node" : {
                                 "format" : "pve-node",
                                 "type" : "string",
                                 "description" : "The cluster node name."
                              }
                           }
                        },
                        "method" : "DELETE",
                        "proxyto" : "node"
                     },
                     "POST" : {
                        "permissions" : {
                           "check" : [
                              "perm",
                              "/nodes/{node}",
                              [
                                 "Sys.Modify"
                              ]
                           ]
                        },
                        "returns" : {
                           "type" : "null"
                        },
                        "name" : "create_network",
                        "protected" : 1,
                        "description" : "Create network device configuration",
                        "parameters" : {
                           "additionalProperties" : 0,
                           "properties" : {
                              "autostart" : {
                                 "type" : "boolean",
                                 "optional" : 1,
                                 "description" : "Automatically start interface on boot."
                              },
                              "gateway" : {
                                 "format" : "ipv4",
                                 "type" : "string",
                                 "optional" : 1,
                                 "description" : "Default gateway address."
                              },
                              "slaves" : {
                                 "format" : "pve-iface-list",
                                 "optional" : 1,
                                 "type" : "string",
                                 "description" : "Specify the interfaces used by the bonding device."
                              },
                              "bridge_ports" : {
                                 "format" : "pve-iface-list",
                                 "optional" : 1,
                                 "type" : "string",
                                 "description" : "Specify the iterfaces you want to add to your bridge."
                              },
                              "node" : {
                                 "format" : "pve-node",
                                 "type" : "string",
                                 "description" : "The cluster node name."
                              },
                              "bond_mode" : {
                                 "enum" : [
                                    "balance-rr",
                                    "active-backup",
                                    "balance-xor",
                                    "broadcast",
                                    "802.3ad",
                                    "balance-tlb",
                                    "balance-alb"
                                 ],
                                 "optional" : 1,
                                 "type" : "string",
                                 "description" : "Bonding mode."
                              },
                              "netmask" : {
                                 "format" : "ipv4mask",
                                 "requires" : "address",
                                 "type" : "string",
                                 "optional" : 1,
                                 "description" : "Network mask."
                              },
                              "iface" : {
                                 "minLength" : 2,
                                 "format" : "pve-iface",
                                 "maxLength" : 20,
                                 "type" : "string",
                                 "description" : "Network interface name."
                              },
                              "address" : {
                                 "format" : "ipv4",
                                 "requires" : "netmask",
                                 "type" : "string",
                                 "optional" : 1,
                                 "description" : "IP address."
                              }
                           }
                        },
                        "method" : "POST",
                        "proxyto" : "node"
                     },
                     "GET" : {
                        "parameters" : {
                           "additionalProperties" : 0,
                           "properties" : {
                              "type" : {
                                 "enum" : [
                                    "bond",
                                    "bridge",
                                    "alias",
                                    "eth"
                                 ],
                                 "type" : "string",
                                 "optional" : 1,
                                 "description" : "Only list specific interface types."
                              },
                              "node" : {
                                 "format" : "pve-node",
                                 "type" : "string",
                                 "description" : "The cluster node name."
                              }
                           }
                        },
                        "permissions" : {
                           "user" : "all"
                        },
                        "returns" : {
                           "type" : "array",
                           "items" : {
                              "type" : "object",
                              "properties" : {}
                           },
                           "links" : [
                              {
                                 "rel" : "child",
                                 "href" : "{iface}"
                              }
                           ]
                        },
                        "name" : "index",
                        "proxyto" : "node",
                        "method" : "GET",
                        "description" : "List available networks"
                     }
                  },
                  "text" : "network",
                  "children" : [
                     {
                        "info" : {
                           "DELETE" : {
                              "permissions" : {
                                 "check" : [
                                    "perm",
                                    "/nodes/{node}",
                                    [
                                       "Sys.Modify"
                                    ]
                                 ]
                              },
                              "returns" : {
                                 "type" : "null"
                              },
                              "name" : "delete_network",
                              "protected" : 1,
                              "description" : "Delete network device configuration",
                              "parameters" : {
                                 "additionalProperties" : 0,
                                 "properties" : {
                                    "iface" : {
                                       "minLength" : 2,
                                       "format" : "pve-iface",
                                       "maxLength" : 20,
                                       "type" : "string",
                                       "description" : "Network interface name."
                                    },
                                    "node" : {
                                       "format" : "pve-node",
                                       "type" : "string",
                                       "description" : "The cluster node name."
                                    }
                                 }
                              },
                              "method" : "DELETE",
                              "proxyto" : "node"
                           },
                           "GET" : {
                              "parameters" : {
                                 "additionalProperties" : 0,
                                 "properties" : {
                                    "iface" : {
                                       "minLength" : 2,
                                       "format" : "pve-iface",
                                       "maxLength" : 20,
                                       "type" : "string",
                                       "description" : "Network interface name."
                                    },
                                    "node" : {
                                       "format" : "pve-node",
                                       "type" : "string",
                                       "description" : "The cluster node name."
                                    }
                                 }
                              },
                              "permissions" : {
                                 "check" : [
                                    "perm",
                                    "/nodes/{node}",
                                    [
                                       "Sys.Audit"
                                    ]
                                 ]
                              },
                              "returns" : {
                                 "type" : "object",
                                 "properties" : {
                                    "type" : {
                                       "type" : "string"
                                    },
                                    "method" : {
                                       "type" : "string"
                                    }
                                 }
                              },
                              "name" : "network_config",
                              "proxyto" : "node",
                              "method" : "GET",
                              "description" : "Read network device configuration"
                           },
                           "PUT" : {
                              "permissions" : {
                                 "check" : [
                                    "perm",
                                    "/nodes/{node}",
                                    [
                                       "Sys.Modify"
                                    ]
                                 ]
                              },
                              "returns" : {
                                 "type" : "null"
                              },
                              "name" : "update_network",
                              "protected" : 1,
                              "description" : "Update network device configuration",
                              "parameters" : {
                                 "additionalProperties" : 0,
                                 "properties" : {
                                    "autostart" : {
                                       "type" : "boolean",
                                       "optional" : 1,
                                       "description" : "Automatically start interface on boot."
                                    },
                                    "gateway" : {
                                       "format" : "ipv4",
                                       "type" : "string",
                                       "optional" : 1,
                                       "description" : "Default gateway address."
                                    },
                                    "slaves" : {
                                       "format" : "pve-iface-list",
                                       "optional" : 1,
                                       "type" : "string",
                                       "description" : "Specify the interfaces used by the bonding device."
                                    },
                                    "bridge_ports" : {
                                       "format" : "pve-iface-list",
                                       "optional" : 1,
                                       "type" : "string",
                                       "description" : "Specify the iterfaces you want to add to your bridge."
                                    },
                                    "node" : {
                                       "format" : "pve-node",
                                       "type" : "string",
                                       "description" : "The cluster node name."
                                    },
                                    "bond_mode" : {
                                       "enum" : [
                                          "balance-rr",
                                          "active-backup",
                                          "balance-xor",
                                          "broadcast",
                                          "802.3ad",
                                          "balance-tlb",
                                          "balance-alb"
                                       ],
                                       "optional" : 1,
                                       "type" : "string",
                                       "description" : "Bonding mode."
                                    },
                                    "delete" : {
                                       "format" : "pve-configid-list",
                                       "type" : "string",
                                       "optional" : 1,
                                       "description" : "A list of settings you want to delete."
                                    },
                                    "address" : {
                                       "format" : "ipv4",
                                       "requires" : "netmask",
                                       "type" : "string",
                                       "optional" : 1,
                                       "description" : "IP address."
                                    },
                                    "iface" : {
                                       "minLength" : 2,
                                       "format" : "pve-iface",
                                       "maxLength" : 20,
                                       "type" : "string",
                                       "description" : "Network interface name."
                                    },
                                    "netmask" : {
                                       "format" : "ipv4mask",
                                       "requires" : "address",
                                       "type" : "string",
                                       "optional" : 1,
                                       "description" : "Network mask."
                                    }
                                 }
                              },
                              "method" : "PUT",
                              "proxyto" : "node"
                           }
                        },
                        "text" : "{iface}",
                        "path" : "/nodes/{node}/network/{iface}",
                        "leaf" : 1
                     }
                  ],
                  "path" : "/nodes/{node}/network",
                  "leaf" : 0
               },
               {
                  "info" : {
                     "GET" : {
                        "parameters" : {
                           "additionalProperties" : 0,
                           "properties" : {
                              "errors" : {
                                 "type" : "boolean",
                                 "optional" : 1
                              },
                              "limit" : {
                                 "minimum" : 0,
                                 "type" : "integer",
                                 "optional" : 1
                              },
                              "node" : {
                                 "format" : "pve-node",
                                 "type" : "string",
                                 "description" : "The cluster node name."
                              },
                              "vmid" : {
                                 "minimum" : 1,
                                 "format" : "pve-vmid",
                                 "optional" : 1,
                                 "type" : "integer",
                                 "description" : "Only list tasks for this VM."
                              },
                              "start" : {
                                 "minimum" : 0,
                                 "type" : "integer",
                                 "optional" : 1
                              },
                              "userfilter" : {
                                 "type" : "string",
                                 "optional" : 1
                              }
                           }
                        },
                        "permissions" : {
                           "user" : "all",
                           "description" : "List task associated with the current user, or all task the user has 'Sys.Audit' permissions on /nodes/<node> (the <node> the task runs on)."
                        },
                        "returns" : {
                           "type" : "array",
                           "items" : {
                              "type" : "object",
                              "properties" : {
                                 "upid" : {
                                    "type" : "string"
                                 }
                              }
                           },
                           "links" : [
                              {
                                 "rel" : "child",
                                 "href" : "{upid}"
                              }
                           ]
                        },
                        "name" : "node_tasks",
                        "proxyto" : "node",
                        "method" : "GET",
                        "description" : "Read task list for one node (finished tasks)."
                     }
                  },
                  "text" : "tasks",
                  "children" : [
                     {
                        "info" : {
                           "DELETE" : {
                              "permissions" : {
                                 "user" : "all",
                                 "description" : "The user needs 'Sys.Modify' permissions on '/nodes/<node>' if the task does not belong to him."
                              },
                              "returns" : {
                                 "type" : "null"
                              },
                              "name" : "stop_task",
                              "protected" : 1,
                              "description" : "Stop a task.",
                              "parameters" : {
                                 "additionalProperties" : 0,
                                 "properties" : {
                                    "upid" : {
                                       "type" : "string"
                                    },
                                    "node" : {
                                       "format" : "pve-node",
                                       "type" : "string",
                                       "description" : "The cluster node name."
                                    }
                                 }
                              },
                              "method" : "DELETE",
                              "proxyto" : "node"
                           },
                           "GET" : {
                              "parameters" : {
                                 "additionalProperties" : 0,
                                 "properties" : {
                                    "upid" : {
                                       "type" : "string"
                                    },
                                    "node" : {
                                       "format" : "pve-node",
                                       "type" : "string",
                                       "description" : "The cluster node name."
                                    }
                                 }
                              },
                              "permissions" : {
                                 "user" : "all"
                              },
                              "returns" : {
                                 "type" : "array",
                                 "items" : {
                                    "type" : "object",
                                    "properties" : {}
                                 },
                                 "links" : [
                                    {
                                       "rel" : "child",
                                       "href" : "{name}"
                                    }
                                 ]
                              },
                              "name" : "upid_index",
                              "method" : "GET",
                              "description" : ""
                           }
                        },
                        "text" : "{upid}",
                        "children" : [
                           {
                              "info" : {
                                 "GET" : {
                                    "permissions" : {
                                       "user" : "all",
                                       "description" : "The user needs 'Sys.Audit' permissions on '/nodes/<node>' if the task does not belong to him."
                                    },
                                    "returns" : {
                                       "type" : "array",
                                       "items" : {
                                          "type" : "object",
                                          "properties" : {
                                             "n" : {
                                                "type" : "integer",
                                                "description" : "Line number"
                                             },
                                             "t" : {
                                                "type" : "string",
                                                "description" : "Line text"
                                             }
                                          }
                                       }
                                    },
                                    "name" : "read_task_log",
                                    "protected" : 1,
                                    "description" : "Read task log.",
                                    "parameters" : {
                                       "additionalProperties" : 0,
                                       "properties" : {
                                          "upid" : {
                                             "type" : "string"
                                          },
                                          "limit" : {
                                             "minimum" : 0,
                                             "type" : "integer",
                                             "optional" : 1
                                          },
                                          "node" : {
                                             "format" : "pve-node",
                                             "type" : "string",
                                             "description" : "The cluster node name."
                                          },
                                          "start" : {
                                             "minimum" : 0,
                                             "type" : "integer",
                                             "optional" : 1
                                          }
                                       }
                                    },
                                    "method" : "GET",
                                    "proxyto" : "node"
                                 }
                              },
                              "text" : "log",
                              "path" : "/nodes/{node}/tasks/{upid}/log",
                              "leaf" : 1
                           },
                           {
                              "info" : {
                                 "GET" : {
                                    "permissions" : {
                                       "user" : "all",
                                       "description" : "The user needs 'Sys.Audit' permissions on '/nodes/<node>' if the task does not belong to him."
                                    },
                                    "returns" : {
                                       "type" : "object",
                                       "properties" : {
                                          "pid" : {
                                             "type" : "integer"
                                          },
                                          "status" : {
                                             "enum" : [
                                                "running",
                                                "stopped"
                                             ],
                                             "type" : "string"
                                          }
                                       }
                                    },
                                    "name" : "read_task_status",
                                    "protected" : 1,
                                    "description" : "Read task status.",
                                    "parameters" : {
                                       "additionalProperties" : 0,
                                       "properties" : {
                                          "upid" : {
                                             "type" : "string"
                                          },
                                          "node" : {
                                             "format" : "pve-node",
                                             "type" : "string",
                                             "description" : "The cluster node name."
                                          }
                                       }
                                    },
                                    "method" : "GET",
                                    "proxyto" : "node"
                                 }
                              },
                              "text" : "status",
                              "path" : "/nodes/{node}/tasks/{upid}/status",
                              "leaf" : 1
                           }
                        ],
                        "path" : "/nodes/{node}/tasks/{upid}",
                        "leaf" : 0
                     }
                  ],
                  "path" : "/nodes/{node}/tasks",
                  "leaf" : 0
               },
               {
                  "info" : {
                     "GET" : {
                        "parameters" : {
                           "additionalProperties" : 0,
                           "properties" : {
                              "node" : {
                                 "format" : "pve-node",
                                 "type" : "string",
                                 "description" : "The cluster node name."
                              }
                           }
                        },
                        "permissions" : {
                           "user" : "all"
                        },
                        "returns" : {
                           "type" : "array",
                           "items" : {
                              "type" : "object",
                              "properties" : {
                                 "method" : {
                                    "type" : "string"
                                 }
                              }
                           },
                           "links" : [
                              {
                                 "rel" : "child",
                                 "href" : "{method}"
                              }
                           ]
                        },
                        "name" : "index",
                        "method" : "GET",
                        "description" : "Index of available scan methods"
                     }
                  },
                  "text" : "scan",
                  "children" : [
                     {
                        "info" : {
                           "GET" : {
                              "permissions" : {
                                 "check" : [
                                    "perm",
                                    "/storage",
                                    [
                                       "Datastore.Allocate"
                                    ]
                                 ]
                              },
                              "returns" : {
                                 "type" : "array",
                                 "items" : {
                                    "type" : "object",
                                    "properties" : {
                                       "options" : {
                                          "type" : "string"
                                       },
                                       "path" : {
                                          "type" : "string"
                                       }
                                    }
                                 }
                              },
                              "name" : "nfsscan",
                              "protected" : 1,
                              "description" : "Scan remote NFS server.",
                              "parameters" : {
                                 "additionalProperties" : 0,
                                 "properties" : {
                                    "server" : {
                                       "format" : "pve-storage-server",
                                       "type" : "string"
                                    },
                                    "node" : {
                                       "format" : "pve-node",
                                       "type" : "string",
                                       "description" : "The cluster node name."
                                    }
                                 }
                              },
                              "method" : "GET",
                              "proxyto" : "node"
                           }
                        },
                        "text" : "nfs",
                        "path" : "/nodes/{node}/scan/nfs",
                        "leaf" : 1
                     },
                     {
                        "info" : {
                           "GET" : {
                              "permissions" : {
                                 "check" : [
                                    "perm",
                                    "/storage",
                                    [
                                       "Datastore.Allocate"
                                    ]
                                 ]
                              },
                              "returns" : {
                                 "type" : "array",
                                 "items" : {
                                    "type" : "object",
                                    "properties" : {
                                       "target" : {
                                          "type" : "string"
                                       },
                                       "portal" : {
                                          "type" : "string"
                                       }
                                    }
                                 }
                              },
                              "name" : "iscsiscan",
                              "protected" : 1,
                              "description" : "Scan remote iSCSI server.",
                              "parameters" : {
                                 "additionalProperties" : 0,
                                 "properties" : {
                                    "node" : {
                                       "format" : "pve-node",
                                       "type" : "string",
                                       "description" : "The cluster node name."
                                    },
                                    "portal" : {
                                       "format" : "pve-storage-portal-dns",
                                       "type" : "string"
                                    }
                                 }
                              },
                              "method" : "GET",
                              "proxyto" : "node"
                           }
                        },
                        "text" : "iscsi",
                        "path" : "/nodes/{node}/scan/iscsi",
                        "leaf" : 1
                     },
                     {
                        "info" : {
                           "GET" : {
                              "permissions" : {
                                 "check" : [
                                    "perm",
                                    "/storage",
                                    [
                                       "Datastore.Allocate"
                                    ]
                                 ]
                              },
                              "returns" : {
                                 "type" : "array",
                                 "items" : {
                                    "type" : "object",
                                    "properties" : {
                                       "vg" : {
                                          "type" : "string"
                                       }
                                    }
                                 }
                              },
                              "name" : "lvmscan",
                              "protected" : 1,
                              "description" : "List local LVM volume groups.",
                              "parameters" : {
                                 "additionalProperties" : 0,
                                 "properties" : {
                                    "node" : {
                                       "format" : "pve-node",
                                       "type" : "string",
                                       "description" : "The cluster node name."
                                    }
                                 }
                              },
                              "method" : "GET",
                              "proxyto" : "node"
                           }
                        },
                        "text" : "lvm",
                        "path" : "/nodes/{node}/scan/lvm",
                        "leaf" : 1
                     },
                     {
                        "info" : {
                           "GET" : {
                              "permissions" : {
                                 "check" : [
                                    "perm",
                                    "/",
                                    [
                                       "Sys.Modify"
                                    ]
                                 ]
                              },
                              "returns" : {
                                 "type" : "array",
                                 "items" : {
                                    "type" : "object",
                                    "properties" : {
                                       "usbpath" : {
                                          "type" : "string",
                                          "optional" : 1
                                       },
                                       "serial" : {
                                          "type" : "string",
                                          "optional" : 1
                                       },
                                       "devnum" : {
                                          "type" : "integer"
                                       },
                                       "port" : {
                                          "type" : "integer"
                                       },
                                       "vendid" : {
                                          "type" : "string"
                                       },
                                       "prodid" : {
                                          "type" : "string"
                                       },
                                       "level" : {
                                          "type" : "integer"
                                       },
                                       "busnum" : {
                                          "type" : "integer"
                                       },
                                       "speed" : {
                                          "type" : "string"
                                       },
                                       "manufacturer" : {
                                          "type" : "string",
                                          "optional" : 1
                                       },
                                       "class" : {
                                          "type" : "integer"
                                       },
                                       "product" : {
                                          "type" : "string",
                                          "optional" : 1
                                       }
                                    }
                                 }
                              },
                              "name" : "usbscan",
                              "protected" : 1,
                              "description" : "List local USB devices.",
                              "parameters" : {
                                 "additionalProperties" : 0,
                                 "properties" : {
                                    "node" : {
                                       "format" : "pve-node",
                                       "type" : "string",
                                       "description" : "The cluster node name."
                                    }
                                 }
                              },
                              "method" : "GET",
                              "proxyto" : "node"
                           }
                        },
                        "text" : "usb",
                        "path" : "/nodes/{node}/scan/usb",
                        "leaf" : 1
                     }
                  ],
                  "path" : "/nodes/{node}/scan",
                  "leaf" : 0
               },
               {
                  "info" : {
                     "GET" : {
                        "permissions" : {
                           "user" : "all",
                           "description" : "Only list entries where you have 'Datastore.Audit' or 'Datastore.AllocateSpace' permissions on '/storage/<storage>'"
                        },
                        "returns" : {
                           "type" : "array",
                           "items" : {
                              "type" : "object",
                              "properties" : {
                                 "storage" : {
                                    "type" : "string"
                                 }
                              }
                           },
                           "links" : [
                              {
                                 "rel" : "child",
                                 "href" : "{storage}"
                              }
                           ]
                        },
                        "name" : "index",
                        "protected" : 1,
                        "description" : "Get status for all datastores.",
                        "parameters" : {
                           "additionalProperties" : 0,
                           "properties" : {
                              "content" : {
                                 "format" : "pve-storage-content",
                                 "type" : "string",
                                 "optional" : 1,
                                 "description" : "Only list stores which support this content type."
                              },
                              "node" : {
                                 "format" : "pve-node",
                                 "type" : "string",
                                 "description" : "The cluster node name."
                              },
                              "storage" : {
                                 "format" : "pve-storage-id",
                                 "optional" : 1,
                                 "type" : "string",
                                 "description" : "Only list status for  specified storage"
                              }
                           }
                        },
                        "method" : "GET",
                        "proxyto" : "node"
                     }
                  },
                  "text" : "storage",
                  "children" : [
                     {
                        "info" : {
                           "GET" : {
                              "parameters" : {
                                 "additionalProperties" : 0,
                                 "properties" : {
                                    "node" : {
                                       "format" : "pve-node",
                                       "type" : "string",
                                       "description" : "The cluster node name."
                                    },
                                    "storage" : {
                                       "format" : "pve-storage-id",
                                       "type" : "string",
                                       "description" : "The storage identifier."
                                    }
                                 }
                              },
                              "permissions" : {
                                 "check" : [
                                    "perm",
                                    "/storage/{storage}",
                                    [
                                       "Datastore.Audit",
                                       "Datastore.AllocateSpace"
                                    ],
                                    "any",
                                    1
                                 ]
                              },
                              "returns" : {
                                 "type" : "array",
                                 "items" : {
                                    "type" : "object",
                                    "properties" : {
                                       "subdir" : {
                                          "type" : "string"
                                       }
                                    }
                                 },
                                 "links" : [
                                    {
                                       "rel" : "child",
                                       "href" : "{subdir}"
                                    }
                                 ]
                              },
                              "name" : "diridx",
                              "method" : "GET",
                              "description" : ""
                           }
                        },
                        "text" : "{storage}",
                        "children" : [
                           {
                              "info" : {
                                 "POST" : {
                                    "permissions" : {
                                       "check" : [
                                          "perm",
                                          "/storage/{storage}",
                                          [
                                             "Datastore.AllocateSpace"
                                          ]
                                       ]
                                    },
                                    "returns" : {
                                       "type" : "string",
                                       "description" : "Volume identifier"
                                    },
                                    "name" : "create",
                                    "protected" : 1,
                                    "description" : "Allocate disk images.",
                                    "parameters" : {
                                       "additionalProperties" : 0,
                                       "properties" : {
                                          "filename" : {
                                             "type" : "string",
                                             "description" : "The name of the file to create."
                                          },
                                          "format" : {
                                             "enum" : [
                                                "raw",
                                                "qcow2"
                                             ],
                                             "requires" : "size",
                                             "type" : "string",
                                             "optional" : 1
                                          },
                                          "node" : {
                                             "format" : "pve-node",
                                             "type" : "string",
                                             "description" : "The cluster node name."
                                          },
                                          "storage" : {
                                             "format" : "pve-storage-id",
                                             "type" : "string",
                                             "description" : "The storage identifier."
                                          },
                                          "vmid" : {
                                             "minimum" : 1,
                                             "format" : "pve-vmid",
                                             "type" : "integer",
                                             "description" : "Specify owner VM"
                                          },
                                          "size" : {
                                             "pattern" : "\\d+[MG]?",
                                             "type" : "string",
                                             "description" : "Size in kilobyte (1024 bytes). Optional suffixes 'M' (megabyte, 1024K) and 'G' (gigabyte, 1024M)"
                                          }
                                       }
                                    },
                                    "method" : "POST",
                                    "proxyto" : "node"
                                 },
                                 "GET" : {
                                    "permissions" : {
                                       "check" : [
                                          "perm",
                                          "/storage/{storage}",
                                          [
                                             "Datastore.Audit",
                                             "Datastore.AllocateSpace"
                                          ],
                                          "any",
                                          1
                                       ]
                                    },
                                    "returns" : {
                                       "type" : "array",
                                       "items" : {
                                          "type" : "object",
                                          "properties" : {
                                             "volid" : {
                                                "type" : "string"
                                             }
                                          }
                                       },
                                       "links" : [
                                          {
                                             "rel" : "child",
                                             "href" : "{volid}"
                                          }
                                       ]
                                    },
                                    "name" : "index",
                                    "protected" : 1,
                                    "description" : "List storage content.",
                                    "parameters" : {
                                       "additionalProperties" : 0,
                                       "properties" : {
                                          "content" : {
                                             "format" : "pve-storage-content",
                                             "type" : "string",
                                             "optional" : 1,
                                             "description" : "Only list content of this type."
                                          },
                                          "node" : {
                                             "format" : "pve-node",
                                             "type" : "string",
                                             "description" : "The cluster node name."
                                          },
                                          "storage" : {
                                             "format" : "pve-storage-id",
                                             "type" : "string",
                                             "description" : "The storage identifier."
                                          },
                                          "vmid" : {
                                             "minimum" : 1,
                                             "format" : "pve-vmid",
                                             "optional" : 1,
                                             "type" : "integer",
                                             "description" : "Only list images for this VM"
                                          }
                                       }
                                    },
                                    "method" : "GET",
                                    "proxyto" : "node"
                                 }
                              },
                              "text" : "content",
                              "children" : [
                                 {
                                    "info" : {
                                       "DELETE" : {
                                          "permissions" : {
                                             "user" : "all",
                                             "description" : "You need 'Datastore.Allocate' privilege on the storage (or 'Datastore.AllocateSpace' for backup volumes if you have VM.Backup privilege on the VM)."
                                          },
                                          "returns" : {
                                             "type" : "null"
                                          },
                                          "name" : "delete",
                                          "protected" : 1,
                                          "description" : "Delete volume",
                                          "parameters" : {
                                             "additionalProperties" : 0,
                                             "properties" : {
                                                "volume" : {
                                                   "type" : "string",
                                                   "description" : "Volume identifier"
                                                },
                                                "node" : {
                                                   "format" : "pve-node",
                                                   "type" : "string",
                                                   "description" : "The cluster node name."
                                                },
                                                "storage" : {
                                                   "format" : "pve-storage-id",
                                                   "optional" : 1,
                                                   "type" : "string",
                                                   "description" : "The storage identifier."
                                                }
                                             }
                                          },
                                          "method" : "DELETE",
                                          "proxyto" : "node"
                                       },
                                       "POST" : {
                                          "parameters" : {
                                             "additionalProperties" : 0,
                                             "properties" : {
                                                "target" : {
                                                   "type" : "string",
                                                   "description" : "Target volume identifier"
                                                },
                                                "volume" : {
                                                   "type" : "string",
                                                   "description" : "Source volume identifier"
                                                },
                                                "target_node" : {
                                                   "format" : "pve-node",
                                                   "optional" : 1,
                                                   "type" : "string",
                                                   "description" : "Target node. Default is local node."
                                                },
                                                "node" : {
                                                   "format" : "pve-node",
                                                   "type" : "string",
                                                   "description" : "The cluster node name."
                                                },
                                                "storage" : {
                                                   "format" : "pve-storage-id",
                                                   "optional" : 1,
                                                   "type" : "string",
                                                   "description" : "The storage identifier."
                                                }
                                             }
                                          },
                                          "returns" : {
                                             "type" : "string"
                                          },
                                          "name" : "copy",
                                          "protected" : 1,
                                          "proxyto" : "node",
                                          "method" : "POST",
                                          "description" : "Copy a volume. This is experimental code - do not use."
                                       },
                                       "GET" : {
                                          "permissions" : {
                                             "user" : "all",
                                             "description" : "You need read access for the volume."
                                          },
                                          "returns" : {
                                             "type" : "object"
                                          },
                                          "name" : "info",
                                          "protected" : 1,
                                          "description" : "Get volume attributes",
                                          "parameters" : {
                                             "additionalProperties" : 0,
                                             "properties" : {
                                                "volume" : {
                                                   "type" : "string",
                                                   "description" : "Volume identifier"
                                                },
                                                "node" : {
                                                   "format" : "pve-node",
                                                   "type" : "string",
                                                   "description" : "The cluster node name."
                                                },
                                                "storage" : {
                                                   "format" : "pve-storage-id",
                                                   "optional" : 1,
                                                   "type" : "string",
                                                   "description" : "The storage identifier."
                                                }
                                             }
                                          },
                                          "method" : "GET",
                                          "proxyto" : "node"
                                       }
                                    },
                                    "text" : "{volume}",
                                    "path" : "/nodes/{node}/storage/{storage}/content/{volume}",
                                    "leaf" : 1
                                 }
                              ],
                              "path" : "/nodes/{node}/storage/{storage}/content",
                              "leaf" : 0
                           },
                           {
                              "info" : {
                                 "GET" : {
                                    "permissions" : {
                                       "check" : [
                                          "perm",
                                          "/storage/{storage}",
                                          [
                                             "Datastore.Audit",
                                             "Datastore.AllocateSpace"
                                          ],
                                          "any",
                                          1
                                       ]
                                    },
                                    "returns" : {
                                       "type" : "object",
                                       "properties" : {}
                                    },
                                    "name" : "read_status",
                                    "protected" : 1,
                                    "description" : "Read storage status.",
                                    "parameters" : {
                                       "additionalProperties" : 0,
                                       "properties" : {
                                          "node" : {
                                             "format" : "pve-node",
                                             "type" : "string",
                                             "description" : "The cluster node name."
                                          },
                                          "storage" : {
                                             "format" : "pve-storage-id",
                                             "type" : "string",
                                             "description" : "The storage identifier."
                                          }
                                       }
                                    },
                                    "method" : "GET",
                                    "proxyto" : "node"
                                 }
                              },
                              "text" : "status",
                              "path" : "/nodes/{node}/storage/{storage}/status",
                              "leaf" : 1
                           },
                           {
                              "info" : {
                                 "GET" : {
                                    "permissions" : {
                                       "check" : [
                                          "perm",
                                          "/storage/{storage}",
                                          [
                                             "Datastore.Audit",
                                             "Datastore.AllocateSpace"
                                          ],
                                          "any",
                                          1
                                       ]
                                    },
                                    "returns" : {
                                       "type" : "object",
                                       "properties" : {
                                          "filename" : {
                                             "type" : "string"
                                          }
                                       }
                                    },
                                    "name" : "rrd",
                                    "protected" : 1,
                                    "description" : "Read storage RRD statistics (returns PNG).",
                                    "parameters" : {
                                       "additionalProperties" : 0,
                                       "properties" : {
                                          "timeframe" : {
                                             "enum" : [
                                                "hour",
                                                "day",
                                                "week",
                                                "month",
                                                "year"
                                             ],
                                             "type" : "string",
                                             "description" : "Specify the time frame you are interested in."
                                          },
                                          "cf" : {
                                             "enum" : [
                                                "AVERAGE",
                                                "MAX"
                                             ],
                                             "type" : "string",
                                             "optional" : 1,
                                             "description" : "The RRD consolidation function"
                                          },
                                          "node" : {
                                             "format" : "pve-node",
                                             "type" : "string",
                                             "description" : "The cluster node name."
                                          },
                                          "storage" : {
                                             "format" : "pve-storage-id",
                                             "type" : "string",
                                             "description" : "The storage identifier."
                                          },
                                          "ds" : {
                                             "format" : "pve-configid-list",
                                             "type" : "string",
                                             "description" : "The list of datasources you want to display."
                                          }
                                       }
                                    },
                                    "method" : "GET",
                                    "proxyto" : "node"
                                 }
                              },
                              "text" : "rrd",
                              "path" : "/nodes/{node}/storage/{storage}/rrd",
                              "leaf" : 1
                           },
                           {
                              "info" : {
                                 "GET" : {
                                    "permissions" : {
                                       "check" : [
                                          "perm",
                                          "/storage/{storage}",
                                          [
                                             "Datastore.Audit",
                                             "Datastore.AllocateSpace"
                                          ],
                                          "any",
                                          1
                                       ]
                                    },
                                    "returns" : {
                                       "type" : "array",
                                       "items" : {
                                          "type" : "object",
                                          "properties" : {}
                                       }
                                    },
                                    "name" : "rrddata",
                                    "protected" : 1,
                                    "description" : "Read storage RRD statistics.",
                                    "parameters" : {
                                       "additionalProperties" : 0,
                                       "properties" : {
                                          "timeframe" : {
                                             "enum" : [
                                                "hour",
                                                "day",
                                                "week",
                                                "month",
                                                "year"
                                             ],
                                             "type" : "string",
                                             "description" : "Specify the time frame you are interested in."
                                          },
                                          "cf" : {
                                             "enum" : [
                                                "AVERAGE",
                                                "MAX"
                                             ],
                                             "type" : "string",
                                             "optional" : 1,
                                             "description" : "The RRD consolidation function"
                                          },
                                          "node" : {
                                             "format" : "pve-node",
                                             "type" : "string",
                                             "description" : "The cluster node name."
                                          },
                                          "storage" : {
                                             "format" : "pve-storage-id",
                                             "type" : "string",
                                             "description" : "The storage identifier."
                                          }
                                       }
                                    },
                                    "method" : "GET",
                                    "proxyto" : "node"
                                 }
                              },
                              "text" : "rrddata",
                              "path" : "/nodes/{node}/storage/{storage}/rrddata",
                              "leaf" : 1
                           },
                           {
                              "info" : {
                                 "POST" : {
                                    "parameters" : {
                                       "additionalProperties" : 0,
                                       "properties" : {
                                          "tmpfilename" : {
                                             "type" : "string",
                                             "optional" : 1,
                                             "description" : "The source file name. This parameter is usually set by the REST handler. You can only overwrite it when connecting to the trustet port on localhost."
                                          },
                                          "filename" : {
                                             "type" : "string",
                                             "description" : "The name of the file to create."
                                          },
                                          "content" : {
                                             "format" : "pve-storage-content",
                                             "type" : "string",
                                             "description" : "Content type."
                                          },
                                          "node" : {
                                             "format" : "pve-node",
                                             "type" : "string",
                                             "description" : "The cluster node name."
                                          },
                                          "storage" : {
                                             "format" : "pve-storage-id",
                                             "type" : "string",
                                             "description" : "The storage identifier."
                                          }
                                       }
                                    },
                                    "permissions" : {
                                       "check" : [
                                          "perm",
                                          "/storage/{storage}",
                                          [
                                             "Datastore.AllocateTemplate"
                                          ]
                                       ]
                                    },
                                    "returns" : {
                                       "type" : "string"
                                    },
                                    "name" : "upload",
                                    "protected" : 1,
                                    "method" : "POST",
                                    "description" : "Upload templates and ISO images."
                                 }
                              },
                              "text" : "upload",
                              "path" : "/nodes/{node}/storage/{storage}/upload",
                              "leaf" : 1
                           }
                        ],
                        "path" : "/nodes/{node}/storage/{storage}",
                        "leaf" : 0
                     }
                  ],
                  "path" : "/nodes/{node}/storage",
                  "leaf" : 0
               },
               {
                  "info" : {
                     "GET" : {
                        "parameters" : {
                           "additionalProperties" : 0,
                           "properties" : {
                              "node" : {
                                 "format" : "pve-node",
                                 "type" : "string",
                                 "description" : "The cluster node name."
                              }
                           }
                        },
                        "permissions" : {
                           "user" : "all"
                        },
                        "returns" : {
                           "type" : "object",
                           "properties" : {
                              "version" : {
                                 "type" : "string"
                              },
                              "repoid" : {
                                 "type" : "string"
                              },
                              "release" : {
                                 "type" : "string"
                              }
                           }
                        },
                        "name" : "version",
                        "proxyto" : "node",
                        "method" : "GET",
                        "description" : "API version details"
                     }
                  },
                  "text" : "version",
                  "path" : "/nodes/{node}/version",
                  "leaf" : 1
               },
               {
                  "info" : {
                     "GET" : {
                        "permissions" : {
                           "check" : [
                              "perm",
                              "/nodes/{node}",
                              [
                                 "Sys.Audit"
                              ]
                           ]
                        },
                        "returns" : {
                           "type" : "array",
                           "items" : {
                              "type" : "object",
                              "properties" : {
                                 "id" : {
                                    "type" : "string"
                                 },
                                 "failcnt" : {
                                    "type" : "number"
                                 }
                              }
                           }
                        },
                        "name" : "beancounters_failcnt",
                        "protected" : 1,
                        "description" : "Get user_beancounters failcnt for all active containers.",
                        "parameters" : {
                           "additionalProperties" : 0,
                           "properties" : {
                              "node" : {
                                 "format" : "pve-node",
                                 "type" : "string",
                                 "description" : "The cluster node name."
                              }
                           }
                        },
                        "method" : "GET",
                        "proxyto" : "node"
                     }
                  },
                  "text" : "ubcfailcnt",
                  "path" : "/nodes/{node}/ubcfailcnt",
                  "leaf" : 1
               },
               {
                  "info" : {
                     "POST" : {
                        "permissions" : {
                           "check" : [
                              "perm",
                              "/nodes/{node}",
                              [
                                 "Sys.PowerMgmt"
                              ]
                           ]
                        },
                        "returns" : {
                           "type" : "null"
                        },
                        "name" : "node_cmd",
                        "protected" : 1,
                        "description" : "Reboot or shutdown a node.",
                        "parameters" : {
                           "additionalProperties" : 0,
                           "properties" : {
                              "node" : {
                                 "format" : "pve-node",
                                 "type" : "string",
                                 "description" : "The cluster node name."
                              },
                              "command" : {
                                 "enum" : [
                                    "reboot",
                                    "shutdown"
                                 ],
                                 "type" : "string",
                                 "description" : "Specify the command."
                              }
                           }
                        },
                        "method" : "POST",
                        "proxyto" : "node"
                     },
                     "GET" : {
                        "parameters" : {
                           "additionalProperties" : 0,
                           "properties" : {
                              "node" : {
                                 "format" : "pve-node",
                                 "type" : "string",
                                 "description" : "The cluster node name."
                              }
                           }
                        },
                        "permissions" : {
                           "check" : [
                              "perm",
                              "/nodes/{node}",
                              [
                                 "Sys.Audit"
                              ]
                           ]
                        },
                        "returns" : {
                           "type" : "object",
                           "properties" : {}
                        },
                        "name" : "status",
                        "proxyto" : "node",
                        "method" : "GET",
                        "description" : "Read node status"
                     }
                  },
                  "text" : "status",
                  "path" : "/nodes/{node}/status",
                  "leaf" : 1
               },
               {
                  "info" : {
                     "GET" : {
                        "parameters" : {
                           "additionalProperties" : 0,
                           "properties" : {
                              "node" : {
                                 "format" : "pve-node",
                                 "type" : "string",
                                 "description" : "The cluster node name."
                              }
                           }
                        },
                        "permissions" : {
                           "check" : [
                              "perm",
                              "/nodes/{node}",
                              [
                                 "Sys.Audit"
                              ]
                           ]
                        },
                        "returns" : {
                           "type" : "array",
                           "items" : {
                              "type" : "object",
                              "properties" : {}
                           }
                        },
                        "name" : "netstat",
                        "proxyto" : "node",
                        "method" : "GET",
                        "description" : "Read tap/vm network device interface counters"
                     }
                  },
                  "text" : "netstat",
                  "path" : "/nodes/{node}/netstat",
                  "leaf" : 1
               },
               {
                  "info" : {
                     "GET" : {
                        "parameters" : {
                           "additionalProperties" : 0,
                           "properties" : {
                              "timeframe" : {
                                 "enum" : [
                                    "hour",
                                    "day",
                                    "week",
                                    "month",
                                    "year"
                                 ],
                                 "type" : "string",
                                 "description" : "Specify the time frame you are interested in."
                              },
                              "cf" : {
                                 "enum" : [
                                    "AVERAGE",
                                    "MAX"
                                 ],
                                 "type" : "string",
                                 "optional" : 1,
                                 "description" : "The RRD consolidation function"
                              },
                              "node" : {
                                 "format" : "pve-node",
                                 "type" : "string",
                                 "description" : "The cluster node name."
                              },
                              "ds" : {
                                 "format" : "pve-configid-list",
                                 "type" : "string",
                                 "description" : "The list of datasources you want to display."
                              }
                           }
                        },
                        "permissions" : {
                           "check" : [
                              "perm",
                              "/nodes/{node}",
                              [
                                 "Sys.Audit"
                              ]
                           ]
                        },
                        "returns" : {
                           "type" : "object",
                           "properties" : {
                              "filename" : {
                                 "type" : "string"
                              }
                           }
                        },
                        "name" : "rrd",
                        "protected" : 1,
                        "method" : "GET",
                        "description" : "Read node RRD statistics (returns PNG)"
                     }
                  },
                  "text" : "rrd",
                  "path" : "/nodes/{node}/rrd",
                  "leaf" : 1
               },
               {
                  "info" : {
                     "GET" : {
                        "parameters" : {
                           "additionalProperties" : 0,
                           "properties" : {
                              "timeframe" : {
                                 "enum" : [
                                    "hour",
                                    "day",
                                    "week",
                                    "month",
                                    "year"
                                 ],
                                 "type" : "string",
                                 "description" : "Specify the time frame you are interested in."
                              },
                              "cf" : {
                                 "enum" : [
                                    "AVERAGE",
                                    "MAX"
                                 ],
                                 "type" : "string",
                                 "optional" : 1,
                                 "description" : "The RRD consolidation function"
                              },
                              "node" : {
                                 "format" : "pve-node",
                                 "type" : "string",
                                 "description" : "The cluster node name."
                              }
                           }
                        },
                        "permissions" : {
                           "check" : [
                              "perm",
                              "/nodes/{node}",
                              [
                                 "Sys.Audit"
                              ]
                           ]
                        },
                        "returns" : {
                           "type" : "array",
                           "items" : {
                              "type" : "object",
                              "properties" : {}
                           }
                        },
                        "name" : "rrddata",
                        "protected" : 1,
                        "method" : "GET",
                        "description" : "Read node RRD statistics"
                     }
                  },
                  "text" : "rrddata",
                  "path" : "/nodes/{node}/rrddata",
                  "leaf" : 1
               },
               {
                  "info" : {
                     "GET" : {
                        "permissions" : {
                           "check" : [
                              "perm",
                              "/nodes/{node}",
                              [
                                 "Sys.Syslog"
                              ]
                           ]
                        },
                        "returns" : {
                           "type" : "array",
                           "items" : {
                              "type" : "object",
                              "properties" : {
                                 "n" : {
                                    "type" : "integer",
                                    "description" : "Line number"
                                 },
                                 "t" : {
                                    "type" : "string",
                                    "description" : "Line text"
                                 }
                              }
                           }
                        },
                        "name" : "syslog",
                        "protected" : 1,
                        "description" : "Read system log",
                        "parameters" : {
                           "additionalProperties" : 0,
                           "properties" : {
                              "limit" : {
                                 "minimum" : 0,
                                 "type" : "integer",
                                 "optional" : 1
                              },
                              "node" : {
                                 "format" : "pve-node",
                                 "type" : "string",
                                 "description" : "The cluster node name."
                              },
                              "start" : {
                                 "minimum" : 0,
                                 "type" : "integer",
                                 "optional" : 1
                              }
                           }
                        },
                        "method" : "GET",
                        "proxyto" : "node"
                     }
                  },
                  "text" : "syslog",
                  "path" : "/nodes/{node}/syslog",
                  "leaf" : 1
               },
               {
                  "info" : {
                     "GET" : {
                        "permissions" : {
                           "check" : [
                              "perm",
                              "/nodes/{node}",
                              [
                                 "Sys.Syslog"
                              ]
                           ]
                        },
                        "returns" : {
                           "type" : "array",
                           "items" : {
                              "type" : "object",
                              "properties" : {
                                 "n" : {
                                    "type" : "integer",
                                    "description" : "Line number"
                                 },
                                 "t" : {
                                    "type" : "string",
                                    "description" : "Line text"
                                 }
                              }
                           }
                        },
                        "name" : "bootlog",
                        "protected" : 1,
                        "description" : "Read boot log",
                        "parameters" : {
                           "additionalProperties" : 0,
                           "properties" : {
                              "limit" : {
                                 "minimum" : 0,
                                 "type" : "integer",
                                 "optional" : 1
                              },
                              "node" : {
                                 "format" : "pve-node",
                                 "type" : "string",
                                 "description" : "The cluster node name."
                              },
                              "start" : {
                                 "minimum" : 0,
                                 "type" : "integer",
                                 "optional" : 1
                              }
                           }
                        },
                        "method" : "GET",
                        "proxyto" : "node"
                     }
                  },
                  "text" : "bootlog",
                  "path" : "/nodes/{node}/bootlog",
                  "leaf" : 1
               },
               {
                  "info" : {
                     "POST" : {
                        "parameters" : {
                           "additionalProperties" : 0,
                           "properties" : {
                              "node" : {
                                 "format" : "pve-node",
                                 "type" : "string",
                                 "description" : "The cluster node name."
                              }
                           }
                        },
                        "permissions" : {
                           "check" : [
                              "perm",
                              "/nodes/{node}",
                              [
                                 "Sys.Console"
                              ]
                           ],
                           "description" : "Restricted to users on realm 'pam'"
                        },
                        "returns" : {
                           "additionalProperties" : 0,
                           "properties" : {
                              "cert" : {
                                 "type" : "string"
                              },
                              "user" : {
                                 "type" : "string"
                              },
                              "upid" : {
                                 "type" : "string"
                              },
                              "ticket" : {
                                 "type" : "string"
                              },
                              "port" : {
                                 "type" : "integer"
                              }
                           }
                        },
                        "name" : "vncshell",
                        "protected" : 1,
                        "method" : "POST",
                        "description" : "Creates a VNC Shell proxy."
                     }
                  },
                  "text" : "vncshell",
                  "path" : "/nodes/{node}/vncshell",
                  "leaf" : 1
               },
               {
                  "info" : {
                     "PUT" : {
                        "permissions" : {
                           "check" : [
                              "perm",
                              "/nodes/{node}",
                              [
                                 "Sys.Modify"
                              ]
                           ]
                        },
                        "returns" : {
                           "type" : "null"
                        },
                        "name" : "update_dns",
                        "protected" : 1,
                        "description" : "Write DNS settings.",
                        "parameters" : {
                           "additionalProperties" : 0,
                           "properties" : {
                              "search" : {
                                 "type" : "string",
                                 "description" : "Search domain for host-name lookup."
                              },
                              "node" : {
                                 "format" : "pve-node",
                                 "type" : "string",
                                 "description" : "The cluster node name."
                              }
                           }
                        },
                        "method" : "PUT",
                        "proxyto" : "node"
                     },
                     "GET" : {
                        "parameters" : {
                           "additionalProperties" : 0,
                           "properties" : {
                              "node" : {
                                 "format" : "pve-node",
                                 "type" : "string",
                                 "description" : "The cluster node name."
                              }
                           }
                        },
                        "permissions" : {
                           "check" : [
                              "perm",
                              "/nodes/{node}",
                              [
                                 "Sys.Audit"
                              ]
                           ]
                        },
                        "returns" : {
                           "type" : "object",
                           "additionalProperties" : 0,
                           "properties" : {
                              "search" : {
                                 "type" : "string",
                                 "optional" : 1,
                                 "description" : "Search domain for host-name lookup."
                              },
                              "dns3" : {
                                 "type" : "string",
                                 "optional" : 1,
                                 "description" : "Third name server IP address."
                              },
                              "dns1" : {
                                 "type" : "string",
                                 "optional" : 1,
                                 "description" : "First name server IP address."
                              },
                              "dns2" : {
                                 "type" : "string",
                                 "optional" : 1,
                                 "description" : "Second name server IP address."
                              }
                           }
                        },
                        "name" : "dns",
                        "proxyto" : "node",
                        "method" : "GET",
                        "description" : "Read DNS settings."
                     }
                  },
                  "text" : "dns",
                  "path" : "/nodes/{node}/dns",
                  "leaf" : 1
               },
               {
                  "info" : {
                     "PUT" : {
                        "permissions" : {
                           "check" : [
                              "perm",
                              "/nodes/{node}",
                              [
                                 "Sys.Modify"
                              ]
                           ]
                        },
                        "returns" : {
                           "type" : "null"
                        },
                        "name" : "set_timezone",
                        "protected" : 1,
                        "description" : "Set time zone.",
                        "parameters" : {
                           "additionalProperties" : 0,
                           "properties" : {
                              "timezone" : {
                                 "type" : "string",
                                 "description" : "Time zone. The file '/usr/share/zoneinfo/zone.tab' contains the list of valid names."
                              },
                              "node" : {
                                 "format" : "pve-node",
                                 "type" : "string",
                                 "description" : "The cluster node name."
                              }
                           }
                        },
                        "method" : "PUT",
                        "proxyto" : "node"
                     },
                     "GET" : {
                        "parameters" : {
                           "additionalProperties" : 0,
                           "properties" : {
                              "node" : {
                                 "format" : "pve-node",
                                 "type" : "string",
                                 "description" : "The cluster node name."
                              }
                           }
                        },
                        "permissions" : {
                           "check" : [
                              "perm",
                              "/nodes/{node}",
                              [
                                 "Sys.Audit"
                              ]
                           ]
                        },
                        "returns" : {
                           "type" : "object",
                           "additionalProperties" : 0,
                           "properties" : {
                              "localtime" : {
                                 "minimum" : 1297163644,
                                 "type" : "integer",
                                 "description" : "Seconds since 1970-01-01 00:00:00 (local time)"
                              },
                              "timezone" : {
                                 "type" : "string",
                                 "description" : "Time zone"
                              },
                              "time" : {
                                 "minimum" : 1297163644,
                                 "type" : "integer",
                                 "description" : "Seconds since 1970-01-01 00:00:00 UTC."
                              }
                           }
                        },
                        "name" : "time",
                        "proxyto" : "node",
                        "method" : "GET",
                        "description" : "Read server time and time zone settings."
                     }
                  },
                  "text" : "time",
                  "path" : "/nodes/{node}/time",
                  "leaf" : 1
               },
               {
                  "info" : {
                     "POST" : {
                        "permissions" : {
                           "check" : [
                              "perm",
                              "/storage/{storage}",
                              [
                                 "Datastore.AllocateTemplate"
                              ]
                           ]
                        },
                        "returns" : {
                           "type" : "string"
                        },
                        "name" : "apl_download",
                        "protected" : 1,
                        "description" : "Download appliance templates.",
                        "parameters" : {
                           "additionalProperties" : 0,
                           "properties" : {
                              "template" : {
                                 "maxLength" : 255,
                                 "type" : "string"
                              },
                              "node" : {
                                 "format" : "pve-node",
                                 "type" : "string",
                                 "description" : "The cluster node name."
                              },
                              "storage" : {
                                 "format" : "pve-storage-id",
                                 "type" : "string",
                                 "description" : "The storage identifier."
                              }
                           }
                        },
                        "method" : "POST",
                        "proxyto" : "node"
                     },
                     "GET" : {
                        "parameters" : {
                           "additionalProperties" : 0,
                           "properties" : {
                              "node" : {
                                 "format" : "pve-node",
                                 "type" : "string",
                                 "description" : "The cluster node name."
                              }
                           }
                        },
                        "permissions" : {
                           "user" : "all"
                        },
                        "returns" : {
                           "type" : "array",
                           "items" : {
                              "type" : "object",
                              "properties" : {}
                           }
                        },
                        "name" : "aplinfo",
                        "proxyto" : "node",
                        "method" : "GET",
                        "description" : "Get list of appliances."
                     }
                  },
                  "text" : "aplinfo",
                  "path" : "/nodes/{node}/aplinfo",
                  "leaf" : 1
               },
               {
                  "info" : {
                     "POST" : {
                        "parameters" : {
                           "additionalProperties" : 0,
                           "properties" : {
                              "node" : {
                                 "format" : "pve-node",
                                 "type" : "string",
                                 "description" : "The cluster node name."
                              }
                           }
                        },
                        "returns" : {
                           "type" : "string"
                        },
                        "name" : "startall",
                        "protected" : 1,
                        "method" : "POST",
                        "description" : "Start all VMs and containers (when onboot=1)."
                     }
                  },
                  "text" : "startall",
                  "path" : "/nodes/{node}/startall",
                  "leaf" : 1
               },
               {
                  "info" : {
                     "POST" : {
                        "parameters" : {
                           "additionalProperties" : 0,
                           "properties" : {
                              "node" : {
                                 "format" : "pve-node",
                                 "type" : "string",
                                 "description" : "The cluster node name."
                              }
                           }
                        },
                        "returns" : {
                           "type" : "string"
                        },
                        "name" : "stopall",
                        "protected" : 1,
                        "method" : "POST",
                        "description" : "Stop all VMs and Containers."
                     }
                  },
                  "text" : "stopall",
                  "path" : "/nodes/{node}/stopall",
                  "leaf" : 1
               }
            ],
            "path" : "/nodes/{node}",
            "leaf" : 0
         }
      ],
      "path" : "/nodes",
      "leaf" : 0
   },
   {
      "info" : {
         "POST" : {
            "parameters" : {
               "type" : "object",
               "additionalProperties" : 0,
               "properties" : {
                  "authsupported" : {
                     "type" : "string",
                     "optional" : 1,
                     "description" : "Authsupported."
                  },
                  "options" : {
                     "format" : "pve-storage-options",
                     "type" : "string",
                     "optional" : 1,
                     "description" : "NFS mount options (see 'man nfs')"
                  },
                  "blocksize" : {
                     "type" : "string",
                     "optional" : 1,
                     "description" : "block size"
                  },
                  "content" : {
                     "format" : "pve-storage-content-list",
                     "type" : "string",
                     "optional" : 1,
                     "description" : "Allowed content types."
                  },
                  "vgname" : {
                     "format" : "pve-storage-vgname",
                     "type" : "string",
                     "optional" : 1,
                     "description" : "Volume group name."
                  },
                  "shared" : {
                     "type" : "boolean",
                     "optional" : 1,
                     "description" : "Mark storage as shared."
                  },
                  "target" : {
                     "type" : "string",
                     "optional" : 1,
                     "description" : "iSCSI target."
                  },
                  "password" : {
                     "type" : "string",
                     "optional" : 1,
                     "description" : "password"
                  },
                  "pool" : {
                     "type" : "string",
                     "optional" : 1,
                     "description" : "Pool."
                  },
                  "maxfiles" : {
                     "minimum" : 0,
                     "type" : "integer",
                     "optional" : 1,
                     "description" : "Maximal number of backup files per VM. Use '0' for unlimted."
                  },
                  "server" : {
                     "format" : "pve-storage-server",
                     "type" : "string",
                     "optional" : 1,
                     "description" : "Server IP or DNS name."
                  },
                  "export" : {
                     "format" : "pve-storage-path",
                     "type" : "string",
                     "optional" : 1,
                     "description" : "NFS export path."
                  },
                  "monhost" : {
                     "type" : "string",
                     "optional" : 1,
                     "description" : "Monitors daemon ips."
                  },
                  "portal" : {
                     "format" : "pve-storage-portal-dns",
                     "type" : "string",
                     "optional" : 1,
                     "description" : "iSCSI portal (IP or DNS name with optional port)."
                  },
                  "disable" : {
                     "type" : "boolean",
                     "optional" : 1,
                     "description" : "Flag to disable the storage."
                  },
                  "base" : {
                     "format" : "pve-volume-id",
                     "type" : "string",
                     "optional" : 1,
                     "description" : "Base volume. This volume is automatically activated."
                  },
                  "ssl" : {
                     "type" : "boolean",
                     "optional" : 1,
                     "description" : "ssl"
                  },
                  "path" : {
                     "format" : "pve-storage-path",
                     "type" : "string",
                     "optional" : 1,
                     "description" : "File system path."
                  },
                  "saferemove" : {
                     "type" : "boolean",
                     "optional" : 1,
                     "description" : "Zero-out data when removing LVs."
                  },
                  "login" : {
                     "type" : "string",
                     "optional" : 1,
                     "description" : "login"
                  },
                  "username" : {
                     "type" : "string",
                     "optional" : 1,
                     "description" : "RBD Id."
                  },
                  "format" : {
                     "format" : "pve-storage-format",
                     "type" : "string",
                     "optional" : 1,
                     "description" : "Default Image format."
                  },
                  "type" : {
                     "enum" : [
                        "lvm",
                        "nfs",
                        "iscsidirect",
                        "dir",
                        "nexenta",
                        "rbd",
                        "sheepdog",
                        "iscsi"
                     ],
                     "type" : "string",
                     "description" : "Storage type."
                  },
                  "nodes" : {
                     "format" : "pve-node-list",
                     "optional" : 1,
                     "type" : "string",
                     "description" : "List of cluster node names."
                  },
                  "storage" : {
                     "format" : "pve-storage-id",
                     "type" : "string",
                     "description" : "The storage identifier."
                  }
               }
            },
            "permissions" : {
               "check" : [
                  "perm",
                  "/storage",
                  [
                     "Datastore.Allocate"
                  ]
               ]
            },
            "returns" : {
               "type" : "null"
            },
            "name" : "create",
            "protected" : 1,
            "method" : "POST",
            "description" : "Create a new storage."
         },
         "GET" : {
            "parameters" : {
               "additionalProperties" : 0,
               "properties" : {
                  "type" : {
                     "enum" : [
                        "lvm",
                        "nfs",
                        "iscsidirect",
                        "dir",
                        "nexenta",
                        "rbd",
                        "sheepdog",
                        "iscsi"
                     ],
                     "type" : "string",
                     "optional" : 1,
                     "description" : "Only list storage of specific type"
                  }
               }
            },
            "permissions" : {
               "user" : "all",
               "description" : "Only list entries where you have 'Datastore.Audit' or 'Datastore.AllocateSpace' permissions on '/storage/<storage>'"
            },
            "returns" : {
               "type" : "array",
               "items" : {
                  "type" : "object",
                  "properties" : {
                     "storage" : {
                        "type" : "string"
                     }
                  }
               },
               "links" : [
                  {
                     "rel" : "child",
                     "href" : "{storage}"
                  }
               ]
            },
            "name" : "index",
            "method" : "GET",
            "description" : "Storage index."
         }
      },
      "text" : "storage",
      "children" : [
         {
            "info" : {
               "DELETE" : {
                  "parameters" : {
                     "additionalProperties" : 0,
                     "properties" : {
                        "storage" : {
                           "format" : "pve-storage-id",
                           "type" : "string",
                           "description" : "The storage identifier."
                        }
                     }
                  },
                  "permissions" : {
                     "check" : [
                        "perm",
                        "/storage",
                        [
                           "Datastore.Allocate"
                        ]
                     ]
                  },
                  "returns" : {
                     "type" : "null"
                  },
                  "name" : "delete",
                  "protected" : 1,
                  "method" : "DELETE",
                  "description" : "Delete storage configuration."
               },
               "PUT" : {
                  "parameters" : {
                     "type" : "object",
                     "additionalProperties" : 0,
                     "properties" : {
                        "options" : {
                           "format" : "pve-storage-options",
                           "type" : "string",
                           "optional" : 1,
                           "description" : "NFS mount options (see 'man nfs')"
                        },
                        "ssl" : {
                           "type" : "boolean",
                           "optional" : 1,
                           "description" : "ssl"
                        },
                        "content" : {
                           "format" : "pve-storage-content-list",
                           "type" : "string",
                           "optional" : 1,
                           "description" : "Allowed content types."
                        },
                        "saferemove" : {
                           "type" : "boolean",
                           "optional" : 1,
                           "description" : "Zero-out data when removing LVs."
                        },
                        "username" : {
                           "type" : "string",
                           "optional" : 1,
                           "description" : "RBD Id."
                        },
                        "shared" : {
                           "type" : "boolean",
                           "optional" : 1,
                           "description" : "Mark storage as shared."
                        },
                        "format" : {
                           "format" : "pve-storage-format",
                           "type" : "string",
                           "optional" : 1,
                           "description" : "Default Image format."
                        },
                        "pool" : {
                           "type" : "string",
                           "optional" : 1,
                           "description" : "Pool."
                        },
                        "delete" : {
                           "format" : "pve-configid-list",
                           "maxLength" : 4096,
                           "type" : "string",
                           "optional" : 1,
                           "description" : "A list of settings you want to delete."
                        },
                        "maxfiles" : {
                           "minimum" : 0,
                           "type" : "integer",
                           "optional" : 1,
                           "description" : "Maximal number of backup files per VM. Use '0' for unlimted."
                        },
                        "nodes" : {
                           "format" : "pve-node-list",
                           "optional" : 1,
                           "type" : "string",
                           "description" : "List of cluster node names."
                        },
                        "digest" : {
                           "maxLength" : 40,
                           "type" : "string",
                           "optional" : 1,
                           "description" : "Prevent changes if current configuration file has different SHA1 digest. This can be used to prevent concurrent modifications."
                        },
                        "storage" : {
                           "format" : "pve-storage-id",
                           "type" : "string",
                           "description" : "The storage identifier."
                        },
                        "disable" : {
                           "type" : "boolean",
                           "optional" : 1,
                           "description" : "Flag to disable the storage."
                        }
                     }
                  },
                  "permissions" : {
                     "check" : [
                        "perm",
                        "/storage",
                        [
                           "Datastore.Allocate"
                        ]
                     ]
                  },
                  "returns" : {
                     "type" : "null"
                  },
                  "name" : "update",
                  "protected" : 1,
                  "method" : "PUT",
                  "description" : "Update storage configuration."
               },
               "GET" : {
                  "parameters" : {
                     "additionalProperties" : 0,
                     "properties" : {
                        "storage" : {
                           "format" : "pve-storage-id",
                           "type" : "string",
                           "description" : "The storage identifier."
                        }
                     }
                  },
                  "permissions" : {
                     "check" : [
                        "perm",
                        "/storage/{storage}",
                        [
                           "Datastore.Allocate"
                        ]
                     ]
                  },
                  "returns" : {},
                  "name" : "read",
                  "method" : "GET",
                  "description" : "Read storage configuration."
               }
            },
            "text" : "{storage}",
            "path" : "/storage/{storage}",
            "leaf" : 1
         }
      ],
      "path" : "/storage",
      "leaf" : 0
   },
   {
      "info" : {
         "GET" : {
            "parameters" : {
               "additionalProperties" : 0
            },
            "permissions" : {
               "user" : "all"
            },
            "returns" : {
               "type" : "array",
               "items" : {
                  "type" : "object",
                  "properties" : {
                     "subdir" : {
                        "type" : "string"
                     }
                  }
               },
               "links" : [
                  {
                     "rel" : "child",
                     "href" : "{subdir}"
                  }
               ]
            },
            "name" : "index",
            "method" : "GET",
            "description" : "Directory index."
         }
      },
      "text" : "access",
      "children" : [
         {
            "info" : {
               "POST" : {
                  "parameters" : {
                     "additionalProperties" : 0,
                     "properties" : {
                        "firstname" : {
                           "type" : "string",
                           "optional" : 1
                        },
                        "enable" : {
                           "type" : "boolean",
                           "optional" : 1,
                           "default" : 1,
                           "description" : "Enable the account (default). You can set this to '0' to disable the accout"
                        },
                        "userid" : {
                           "format" : "pve-userid",
                           "maxLength" : 64,
                           "type" : "string",
                           "description" : "User ID"
                        },
                        "lastname" : {
                           "type" : "string",
                           "optional" : 1
                        },
                        "email" : {
                           "format" : "email-opt",
                           "type" : "string",
                           "optional" : 1
                        },
                        "password" : {
                           "minLength" : 5,
                           "maxLength" : 64,
                           "type" : "string",
                           "optional" : 1,
                           "description" : "Initial password."
                        },
                        "comment" : {
                           "type" : "string",
                           "optional" : 1
                        },
                        "groups" : {
                           "format" : "pve-groupid-list",
                           "type" : "string",
                           "optional" : 1
                        },
                        "expire" : {
                           "minimum" : 0,
                           "type" : "integer",
                           "optional" : 1,
                           "description" : "Account expiration date (seconds since epoch). '0' means no expiration date."
                        }
                     }
                  },
                  "permissions" : {
                     "check" : [
                        "and",
                        [
                           "userid-param",
                           "Realm.AllocateUser"
                        ],
                        [
                           "userid-group",
                           [
                              "User.Modify"
                           ],
                           "groups_param",
                           1
                        ]
                     ],
                     "description" : "You need 'Realm.AllocateUser' on '/access/realm/<realm>' on the realm of user <userid>, and 'User.Modify' permissions to '/access/groups/<group>' for any group specified (or 'User.Modify' on '/access/groups' if you pass no groups."
                  },
                  "returns" : {
                     "type" : "null"
                  },
                  "name" : "create_user",
                  "protected" : 1,
                  "method" : "POST",
                  "description" : "Create new user."
               },
               "GET" : {
                  "parameters" : {
                     "additionalProperties" : 0,
                     "properties" : {
                        "enabled" : {
                           "type" : "boolean",
                           "optional" : 1,
                           "description" : "Optional filter for enable property."
                        }
                     }
                  },
                  "permissions" : {
                     "user" : "all",
                     "description" : "The returned list is restricted to users where you have 'User.Modify' or 'Sys.Audit' permissions on '/access/groups' or on a group the user belongs too. But it always includes the current (authenticated) user."
                  },
                  "returns" : {
                     "type" : "array",
                     "items" : {
                        "type" : "object",
                        "properties" : {
                           "userid" : {
                              "type" : "string"
                           }
                        }
                     },
                     "links" : [
                        {
                           "rel" : "child",
                           "href" : "{userid}"
                        }
                     ]
                  },
                  "name" : "index",
                  "method" : "GET",
                  "description" : "User index."
               }
            },
            "text" : "users",
            "children" : [
               {
                  "info" : {
                     "DELETE" : {
                        "parameters" : {
                           "additionalProperties" : 0,
                           "properties" : {
                              "userid" : {
                                 "format" : "pve-userid",
                                 "maxLength" : 64,
                                 "type" : "string",
                                 "description" : "User ID"
                              }
                           }
                        },
                        "permissions" : {
                           "check" : [
                              "and",
                              [
                                 "userid-param",
                                 "Realm.AllocateUser"
                              ],
                              [
                                 "userid-group",
                                 [
                                    "User.Modify"
                                 ]
                              ]
                           ]
                        },
                        "returns" : {
                           "type" : "null"
                        },
                        "name" : "delete_user",
                        "protected" : 1,
                        "method" : "DELETE",
                        "description" : "Delete user."
                     },
                     "PUT" : {
                        "parameters" : {
                           "additionalProperties" : 0,
                           "properties" : {
                              "firstname" : {
                                 "type" : "string",
                                 "optional" : 1
                              },
                              "enable" : {
                                 "type" : "boolean",
                                 "optional" : 1,
                                 "description" : "Enable/disable the account."
                              },
                              "userid" : {
                                 "format" : "pve-userid",
                                 "maxLength" : 64,
                                 "type" : "string",
                                 "description" : "User ID"
                              },
                              "lastname" : {
                                 "type" : "string",
                                 "optional" : 1
                              },
                              "append" : {
                                 "requires" : "groups",
                                 "type" : "boolean",
                                 "optional" : 1
                              },
                              "email" : {
                                 "format" : "email-opt",
                                 "type" : "string",
                                 "optional" : 1
                              },
                              "comment" : {
                                 "type" : "string",
                                 "optional" : 1
                              },
                              "groups" : {
                                 "format" : "pve-groupid-list",
                                 "type" : "string",
                                 "optional" : 1
                              },
                              "expire" : {
                                 "minimum" : 0,
                                 "type" : "integer",
                                 "optional" : 1,
                                 "description" : "Account expiration date (seconds since epoch). '0' means no expiration date."
                              }
                           }
                        },
                        "permissions" : {
                           "check" : [
                              "userid-group",
                              [
                                 "User.Modify"
                              ],
                              "groups_param",
                              1
                           ]
                        },
                        "returns" : {
                           "type" : "null"
                        },
                        "name" : "update_user",
                        "protected" : 1,
                        "method" : "PUT",
                        "description" : "Update user configuration."
                     },
                     "GET" : {
                        "parameters" : {
                           "additionalProperties" : 0,
                           "properties" : {
                              "userid" : {
                                 "format" : "pve-userid",
                                 "maxLength" : 64,
                                 "type" : "string",
                                 "description" : "User ID"
                              }
                           }
                        },
                        "permissions" : {
                           "check" : [
                              "userid-group",
                              [
                                 "User.Modify",
                                 "Sys.Audit"
                              ]
                           ]
                        },
                        "returns" : {
                           "additionalProperties" : 0,
                           "properties" : {
                              "firstname" : {
                                 "type" : "string",
                                 "optional" : 1
                              },
                              "email" : {
                                 "type" : "string",
                                 "optional" : 1
                              },
                              "enable" : {
                                 "type" : "boolean"
                              },
                              "comment" : {
                                 "type" : "string",
                                 "optional" : 1
                              },
                              "groups" : {
                                 "type" : "array"
                              },
                              "lastname" : {
                                 "type" : "string",
                                 "optional" : 1
                              },
                              "expire" : {
                                 "type" : "integer",
                                 "optional" : 1
                              }
                           }
                        },
                        "name" : "read_user",
                        "method" : "GET",
                        "description" : "Get user configuration."
                     }
                  },
                  "text" : "{userid}",
                  "path" : "/access/users/{userid}",
                  "leaf" : 1
               }
            ],
            "path" : "/access/users",
            "leaf" : 0
         },
         {
            "info" : {
               "POST" : {
                  "parameters" : {
                     "additionalProperties" : 0,
                     "properties" : {
                        "comment" : {
                           "type" : "string",
                           "optional" : 1
                        },
                        "groupid" : {
                           "format" : "pve-groupid",
                           "type" : "string"
                        }
                     }
                  },
                  "permissions" : {
                     "check" : [
                        "perm",
                        "/access/groups",
                        [
                           "Group.Allocate"
                        ]
                     ]
                  },
                  "returns" : {
                     "type" : "null"
                  },
                  "name" : "create_group",
                  "protected" : 1,
                  "method" : "POST",
                  "description" : "Create new group."
               },
               "GET" : {
                  "parameters" : {
                     "additionalProperties" : 0
                  },
                  "permissions" : {
                     "user" : "all",
                     "description" : "The returned list is restricted to groups where you have 'User.Modify', 'Sys.Audit'  or 'Group.Allocate' permissions on /access/groups/<group>."
                  },
                  "returns" : {
                     "type" : "array",
                     "items" : {
                        "type" : "object",
                        "properties" : {
                           "groupid" : {
                              "type" : "string"
                           }
                        }
                     },
                     "links" : [
                        {
                           "rel" : "child",
                           "href" : "{groupid}"
                        }
                     ]
                  },
                  "name" : "index",
                  "method" : "GET",
                  "description" : "Group index."
               }
            },
            "text" : "groups",
            "children" : [
               {
                  "info" : {
                     "DELETE" : {
                        "parameters" : {
                           "additionalProperties" : 0,
                           "properties" : {
                              "groupid" : {
                                 "format" : "pve-groupid",
                                 "type" : "string"
                              }
                           }
                        },
                        "permissions" : {
                           "check" : [
                              "perm",
                              "/access/groups",
                              [
                                 "Group.Allocate"
                              ]
                           ]
                        },
                        "returns" : {
                           "type" : "null"
                        },
                        "name" : "delete_group",
                        "protected" : 1,
                        "method" : "DELETE",
                        "description" : "Delete group."
                     },
                     "GET" : {
                        "parameters" : {
                           "additionalProperties" : 0,
                           "properties" : {
                              "groupid" : {
                                 "format" : "pve-groupid",
                                 "type" : "string"
                              }
                           }
                        },
                        "permissions" : {
                           "check" : [
                              "perm",
                              "/access/groups",
                              [
                                 "Sys.Audit",
                                 "Group.Allocate"
                              ],
                              "any",
                              1
                           ]
                        },
                        "returns" : {
                           "type" : "object",
                           "additionalProperties" : 0,
                           "properties" : {
                              "members" : {
                                 "type" : "array",
                                 "items" : {
                                    "type" : "string"
                                 }
                              },
                              "comment" : {
                                 "type" : "string",
                                 "optional" : 1
                              }
                           }
                        },
                        "name" : "read_group",
                        "method" : "GET",
                        "description" : "Get group configuration."
                     },
                     "PUT" : {
                        "parameters" : {
                           "additionalProperties" : 0,
                           "properties" : {
                              "comment" : {
                                 "type" : "string",
                                 "optional" : 1
                              },
                              "groupid" : {
                                 "format" : "pve-groupid",
                                 "type" : "string"
                              }
                           }
                        },
                        "permissions" : {
                           "check" : [
                              "perm",
                              "/access/groups",
                              [
                                 "Group.Allocate"
                              ]
                           ]
                        },
                        "returns" : {
                           "type" : "null"
                        },
                        "name" : "update_group",
                        "protected" : 1,
                        "method" : "PUT",
                        "description" : "Update group data."
                     }
                  },
                  "text" : "{groupid}",
                  "path" : "/access/groups/{groupid}",
                  "leaf" : 1
               }
            ],
            "path" : "/access/groups",
            "leaf" : 0
         },
         {
            "info" : {
               "POST" : {
                  "parameters" : {
                     "additionalProperties" : 0,
                     "properties" : {
                        "privs" : {
                           "format" : "pve-priv-list",
                           "type" : "string",
                           "optional" : 1
                        },
                        "roleid" : {
                           "format" : "pve-roleid",
                           "type" : "string"
                        }
                     }
                  },
                  "permissions" : {
                     "check" : [
                        "perm",
                        "/access",
                        [
                           "Sys.Modify"
                        ]
                     ]
                  },
                  "returns" : {
                     "type" : "null"
                  },
                  "name" : "create_role",
                  "protected" : 1,
                  "method" : "POST",
                  "description" : "Create new role."
               },
               "GET" : {
                  "parameters" : {
                     "additionalProperties" : 0
                  },
                  "permissions" : {
                     "user" : "all"
                  },
                  "returns" : {
                     "type" : "array",
                     "items" : {
                        "type" : "object",
                        "properties" : {
                           "roleid" : {
                              "type" : "string"
                           }
                        }
                     },
                     "links" : [
                        {
                           "rel" : "child",
                           "href" : "{roleid}"
                        }
                     ]
                  },
                  "name" : "index",
                  "method" : "GET",
                  "description" : "Role index."
               }
            },
            "text" : "roles",
            "children" : [
               {
                  "info" : {
                     "DELETE" : {
                        "parameters" : {
                           "additionalProperties" : 0,
                           "properties" : {
                              "roleid" : {
                                 "format" : "pve-roleid",
                                 "type" : "string"
                              }
                           }
                        },
                        "permissions" : {
                           "check" : [
                              "perm",
                              "/access",
                              [
                                 "Sys.Modify"
                              ]
                           ]
                        },
                        "returns" : {
                           "type" : "null"
                        },
                        "name" : "delete_role",
                        "protected" : 1,
                        "method" : "DELETE",
                        "description" : "Delete role."
                     },
                     "GET" : {
                        "parameters" : {
                           "additionalProperties" : 0,
                           "properties" : {
                              "roleid" : {
                                 "format" : "pve-roleid",
                                 "type" : "string"
                              }
                           }
                        },
                        "permissions" : {
                           "user" : "all"
                        },
                        "returns" : {},
                        "name" : "read_role",
                        "method" : "GET",
                        "description" : "Get role configuration."
                     },
                     "PUT" : {
                        "parameters" : {
                           "additionalProperties" : 0,
                           "properties" : {
                              "privs" : {
                                 "format" : "pve-priv-list",
                                 "type" : "string"
                              },
                              "append" : {
                                 "requires" : "privs",
                                 "type" : "boolean",
                                 "optional" : 1
                              },
                              "roleid" : {
                                 "format" : "pve-roleid",
                                 "type" : "string"
                              }
                           }
                        },
                        "permissions" : {
                           "check" : [
                              "perm",
                              "/access",
                              [
                                 "Sys.Modify"
                              ]
                           ]
                        },
                        "returns" : {
                           "type" : "null"
                        },
                        "name" : "update_role",
                        "protected" : 1,
                        "method" : "PUT",
                        "description" : "Create new role."
                     }
                  },
                  "text" : "{roleid}",
                  "path" : "/access/roles/{roleid}",
                  "leaf" : 1
               }
            ],
            "path" : "/access/roles",
            "leaf" : 0
         },
         {
            "info" : {
               "PUT" : {
                  "parameters" : {
                     "additionalProperties" : 0,
                     "properties" : {
                        "roles" : {
                           "format" : "pve-roleid-list",
                           "type" : "string",
                           "description" : "List of roles."
                        },
                        "propagate" : {
                           "type" : "boolean",
                           "optional" : 1,
                           "default" : 1,
                           "description" : "Allow to propagate (inherit) permissions."
                        },
                        "groups" : {
                           "format" : "pve-groupid-list",
                           "type" : "string",
                           "optional" : 1,
                           "description" : "List of groups."
                        },
                        "delete" : {
                           "type" : "boolean",
                           "optional" : 1,
                           "description" : "Remove permissions (instead of adding it)."
                        },
                        "path" : {
                           "type" : "string",
                           "description" : "Access control path"
                        },
                        "users" : {
                           "format" : "pve-userid-list",
                           "type" : "string",
                           "optional" : 1,
                           "description" : "List of users."
                        }
                     }
                  },
                  "permissions" : {
                     "check" : [
                        "perm-modify",
                        "{path}"
                     ]
                  },
                  "returns" : {
                     "type" : "null"
                  },
                  "name" : "update_acl",
                  "protected" : 1,
                  "method" : "PUT",
                  "description" : "Update Access Control List (add or remove permissions)."
               },
               "GET" : {
                  "parameters" : {
                     "additionalProperties" : 0
                  },
                  "permissions" : {
                     "user" : "all",
                     "description" : "The returned list is restricted to objects where you have rights to modify permissions."
                  },
                  "returns" : {
                     "type" : "array",
                     "items" : {
                        "type" : "object",
                        "additionalProperties" : 0,
                        "properties" : {
                           "propagate" : {
                              "type" : "boolean"
                           },
                           "ugid" : {
                              "type" : "string"
                           },
                           "path" : {
                              "type" : "string"
                           },
                           "type" : {
                              "enum" : [
                                 "user",
                                 "group"
                              ],
                              "type" : "string"
                           },
                           "roleid" : {
                              "type" : "string"
                           }
                        }
                     }
                  },
                  "name" : "read_acl",
                  "method" : "GET",
                  "description" : "Get Access Control List (ACLs)."
               }
            },
            "text" : "acl",
            "path" : "/access/acl",
            "leaf" : 1
         },
         {
            "info" : {
               "POST" : {
                  "parameters" : {
                     "type" : "object",
                     "additionalProperties" : 0,
                     "properties" : {
                        "secure" : {
                           "optional" : 1,
                           "type" : "boolean",
                           "description" : "Use secure LDAPS protocol."
                        },
                        "user_attr" : {
                           "pattern" : "\\S{2,}",
                           "maxLength" : 256,
                           "optional" : 1,
                           "type" : "string",
                           "description" : "LDAP user attribute name"
                        },
                        "default" : {
                           "optional" : 1,
                           "type" : "boolean",
                           "description" : "Use this as default realm"
                        },
                        "port" : {
                           "minimum" : 1,
                           "maximum" : 65535,
                           "optional" : 1,
                           "type" : "integer",
                           "description" : "Server port."
                        },
                        "base_dn" : {
                           "pattern" : "\\w+=[^,]+(,\\s*\\w+=[^,]+)*",
                           "maxLength" : 256,
                           "optional" : 1,
                           "type" : "string",
                           "description" : "LDAP base domain name"
                        },
                        "domain" : {
                           "pattern" : "\\S+",
                           "maxLength" : 256,
                           "optional" : 1,
                           "type" : "string",
                           "description" : "AD domain name"
                        },
                        "comment" : {
                           "maxLength" : 4096,
                           "optional" : 1,
                           "type" : "string",
                           "description" : "Description."
                        },
                        "realm" : {
                           "format" : "pve-realm",
                           "maxLength" : 32,
                           "type" : "string",
                           "description" : "Authentication domain ID"
                        },
                        "type" : {
                           "enum" : [
                              "pve",
                              "pam",
                              "ad",
                              "ldap"
                           ],
                           "type" : "string",
                           "description" : "Realm type."
                        }
                     }
                  },
                  "permissions" : {
                     "check" : [
                        "perm",
                        "/access/realm",
                        [
                           "Realm.Allocate"
                        ]
                     ]
                  },
                  "returns" : {
                     "type" : "null"
                  },
                  "name" : "create",
                  "protected" : 1,
                  "method" : "POST",
                  "description" : "Add an authentication server."
               },
               "GET" : {
                  "parameters" : {
                     "additionalProperties" : 0
                  },
                  "permissions" : {
                     "user" : "world",
                     "description" : "Anyone can access that, because we need that list for the login box (before the user is authenticated)."
                  },
                  "returns" : {
                     "type" : "array",
                     "items" : {
                        "type" : "object",
                        "properties" : {
                           "comment" : {
                              "type" : "string",
                              "optional" : 1
                           },
                           "realm" : {
                              "type" : "string"
                           }
                        }
                     },
                     "links" : [
                        {
                           "rel" : "child",
                           "href" : "{realm}"
                        }
                     ]
                  },
                  "name" : "index",
                  "method" : "GET",
                  "description" : "Authentication domain index."
               }
            },
            "text" : "domains",
            "children" : [
               {
                  "info" : {
                     "DELETE" : {
                        "parameters" : {
                           "additionalProperties" : 0,
                           "properties" : {
                              "realm" : {
                                 "format" : "pve-realm",
                                 "maxLength" : 32,
                                 "type" : "string",
                                 "description" : "Authentication domain ID"
                              }
                           }
                        },
                        "permissions" : {
                           "check" : [
                              "perm",
                              "/access/realm",
                              [
                                 "Realm.Allocate"
                              ]
                           ]
                        },
                        "returns" : {
                           "type" : "null"
                        },
                        "name" : "delete",
                        "protected" : 1,
                        "method" : "DELETE",
                        "description" : "Delete an authentication server."
                     },
                     "GET" : {
                        "parameters" : {
                           "additionalProperties" : 0,
                           "properties" : {
                              "realm" : {
                                 "format" : "pve-realm",
                                 "maxLength" : 32,
                                 "type" : "string",
                                 "description" : "Authentication domain ID"
                              }
                           }
                        },
                        "permissions" : {
                           "check" : [
                              "perm",
                              "/access/realm",
                              [
                                 "Realm.Allocate",
                                 "Sys.Audit"
                              ],
                              "any",
                              1
                           ]
                        },
                        "returns" : {},
                        "name" : "read",
                        "method" : "GET",
                        "description" : "Get auth server configuration."
                     },
                     "PUT" : {
                        "parameters" : {
                           "type" : "object",
                           "additionalProperties" : 0,
                           "properties" : {
                              "user_attr" : {
                                 "pattern" : "\\S{2,}",
                                 "maxLength" : 256,
                                 "optional" : 1,
                                 "type" : "string",
                                 "description" : "LDAP user attribute name"
                              },
                              "secure" : {
                                 "optional" : 1,
                                 "type" : "boolean",
                                 "description" : "Use secure LDAPS protocol."
                              },
                              "default" : {
                                 "optional" : 1,
                                 "type" : "boolean",
                                 "description" : "Use this as default realm"
                              },
                              "port" : {
                                 "minimum" : 1,
                                 "maximum" : 65535,
                                 "optional" : 1,
                                 "type" : "integer",
                                 "description" : "Server port."
                              },
                              "base_dn" : {
                                 "pattern" : "\\w+=[^,]+(,\\s*\\w+=[^,]+)*",
                                 "maxLength" : 256,
                                 "optional" : 1,
                                 "type" : "string",
                                 "description" : "LDAP base domain name"
                              },
                              "domain" : {
                                 "pattern" : "\\S+",
                                 "maxLength" : 256,
                                 "optional" : 1,
                                 "type" : "string",
                                 "description" : "AD domain name"
                              },
                              "comment" : {
                                 "maxLength" : 4096,
                                 "optional" : 1,
                                 "type" : "string",
                                 "description" : "Description."
                              },
                              "realm" : {
                                 "format" : "pve-realm",
                                 "maxLength" : 32,
                                 "type" : "string",
                                 "description" : "Authentication domain ID"
                              },
                              "delete" : {
                                 "format" : "pve-configid-list",
                                 "maxLength" : 4096,
                                 "type" : "string",
                                 "optional" : 1,
                                 "description" : "A list of settings you want to delete."
                              },
                              "digest" : {
                                 "maxLength" : 40,
                                 "type" : "string",
                                 "optional" : 1,
                                 "description" : "Prevent changes if current configuration file has different SHA1 digest. This can be used to prevent concurrent modifications."
                              }
                           }
                        },
                        "permissions" : {
                           "check" : [
                              "perm",
                              "/access/realm",
                              [
                                 "Realm.Allocate"
                              ]
                           ]
                        },
                        "returns" : {
                           "type" : "null"
                        },
                        "name" : "update",
                        "protected" : 1,
                        "method" : "PUT",
                        "description" : "Update authentication server settings."
                     }
                  },
                  "text" : "{realm}",
                  "path" : "/access/domains/{realm}",
                  "leaf" : 1
               }
            ],
            "path" : "/access/domains",
            "leaf" : 0
         },
         {
            "info" : {
               "POST" : {
                  "parameters" : {
                     "additionalProperties" : 0,
                     "properties" : {
                        "password" : {
                           "type" : "string",
                           "description" : "The secret password. This can also be a valid ticket."
                        },
                        "realm" : {
                           "format" : "pve-realm",
                           "maxLength" : 32,
                           "optional" : 1,
                           "type" : "string",
                           "description" : "You can optionally pass the realm using this parameter. Normally the realm is simply added to the username <username>@<relam>."
                        },
                        "path" : {
                           "maxLength" : 64,
                           "requires" : "privs",
                           "type" : "string",
                           "optional" : 1,
                           "description" : "Verify ticket, and check if user have access 'privs' on 'path'"
                        },
                        "privs" : {
                           "format" : "pve-priv-list",
                           "maxLength" : 64,
                           "requires" : "path",
                           "type" : "string",
                           "optional" : 1,
                           "description" : "Verify ticket, and check if user have access 'privs' on 'path'"
                        },
                        "username" : {
                           "maxLength" : 64,
                           "type" : "string",
                           "description" : "User name"
                        }
                     }
                  },
                  "permissions" : {
                     "user" : "world",
                     "description" : "You need to pass valid credientials."
                  },
                  "returns" : {
                     "type" : "object",
                     "properties" : {
                        "CSRFPreventionToken" : {
                           "type" : "string",
                           "optional" : 1
                        },
                        "ticket" : {
                           "type" : "string",
                           "optional" : 1
                        },
                        "username" : {
                           "type" : "string"
                        }
                     }
                  },
                  "name" : "create_ticket",
                  "protected" : 1,
                  "method" : "POST",
                  "description" : "Create or verify authentication ticket."
               }
            },
            "text" : "ticket",
            "path" : "/access/ticket",
            "leaf" : 1
         },
         {
            "info" : {
               "PUT" : {
                  "parameters" : {
                     "additionalProperties" : 0,
                     "properties" : {
                        "password" : {
                           "minLength" : 5,
                           "maxLength" : 64,
                           "type" : "string",
                           "description" : "The new password."
                        },
                        "userid" : {
                           "format" : "pve-userid",
                           "maxLength" : 64,
                           "type" : "string",
                           "description" : "User ID"
                        }
                     }
                  },
                  "permissions" : {
                     "check" : [
                        "or",
                        [
                           "userid-param",
                           "self"
                        ],
                        [
                           "and",
                           [
                              "userid-param",
                              "Realm.AllocateUser"
                           ],
                           [
                              "userid-group",
                              [
                                 "User.Modify"
                              ]
                           ]
                        ]
                     ],
                     "description" : "Each user is allowed to change his own password. A user can change the password of another user if he has 'Realm.AllocateUser' (on the realm of user <userid>) and 'User.Modify' permission on /access/groups/<group> on a group where user <userid> is member of."
                  },
                  "returns" : {
                     "type" : "null"
                  },
                  "name" : "change_passsword",
                  "protected" : 1,
                  "method" : "PUT",
                  "description" : "Change user password."
               }
            },
            "text" : "password",
            "path" : "/access/password",
            "leaf" : 1
         }
      ],
      "path" : "/access",
      "leaf" : 0
   },
   {
      "info" : {
         "POST" : {
            "parameters" : {
               "additionalProperties" : 0,
               "properties" : {
                  "comment" : {
                     "type" : "string",
                     "optional" : 1
                  },
                  "poolid" : {
                     "format" : "pve-poolid",
                     "type" : "string"
                  }
               }
            },
            "permissions" : {
               "check" : [
                  "perm",
                  "/pool/{poolid}",
                  [
                     "Pool.Allocate"
                  ]
               ]
            },
            "returns" : {
               "type" : "null"
            },
            "name" : "create_pool",
            "protected" : 1,
            "method" : "POST",
            "description" : "Create new pool."
         },
         "GET" : {
            "parameters" : {
               "additionalProperties" : 0
            },
            "permissions" : {
               "user" : "all",
               "description" : "List all pools where you have Pool.Allocate or VM.Allocate permissions on /pool/<pool>."
            },
            "returns" : {
               "type" : "array",
               "items" : {
                  "type" : "object",
                  "properties" : {
                     "poolid" : {
                        "type" : "string"
                     }
                  }
               },
               "links" : [
                  {
                     "rel" : "child",
                     "href" : "{poolid}"
                  }
               ]
            },
            "name" : "index",
            "method" : "GET",
            "description" : "Pool index."
         }
      },
      "text" : "pools",
      "children" : [
         {
            "info" : {
               "DELETE" : {
                  "parameters" : {
                     "additionalProperties" : 0,
                     "properties" : {
                        "poolid" : {
                           "format" : "pve-poolid",
                           "type" : "string"
                        }
                     }
                  },
                  "permissions" : {
                     "check" : [
                        "perm",
                        "/pool/{poolid}",
                        [
                           "Pool.Allocate"
                        ]
                     ],
                     "description" : "You can only delete empty pools (no members)."
                  },
                  "returns" : {
                     "type" : "null"
                  },
                  "name" : "delete_pool",
                  "protected" : 1,
                  "method" : "DELETE",
                  "description" : "Delete pool."
               },
               "GET" : {
                  "parameters" : {
                     "additionalProperties" : 0,
                     "properties" : {
                        "poolid" : {
                           "format" : "pve-poolid",
                           "type" : "string"
                        }
                     }
                  },
                  "permissions" : {
                     "check" : [
                        "perm",
                        "/pool/{poolid}",
                        [
                           "Pool.Allocate"
                        ]
                     ]
                  },
                  "returns" : {
                     "type" : "object",
                     "additionalProperties" : 0,
                     "properties" : {
                        "members" : {
                           "type" : "array",
                           "items" : {
                              "type" : "object",
                              "additionalProperties" : 1,
                              "properties" : {
                                 "type" : {
                                    "enum" : [
                                       "qemu",
                                       "openvz",
                                       "storage"
                                    ],
                                    "type" : "string"
                                 },
                                 "id" : {
                                    "type" : "string"
                                 },
                                 "node" : {
                                    "type" : "string"
                                 },
                                 "vmid" : {
                                    "type" : "integer",
                                    "optional" : 1
                                 },
                                 "storage" : {
                                    "type" : "string",
                                    "optional" : 1
                                 }
                              }
                           }
                        },
                        "comment" : {
                           "type" : "string",
                           "optional" : 1
                        }
                     }
                  },
                  "name" : "read_pool",
                  "method" : "GET",
                  "description" : "Get pool configuration."
               },
               "PUT" : {
                  "parameters" : {
                     "additionalProperties" : 0,
                     "properties" : {
                        "comment" : {
                           "type" : "string",
                           "optional" : 1
                        },
                        "delete" : {
                           "type" : "boolean",
                           "optional" : 1,
                           "description" : "Remove vms/storage (instead of adding it)."
                        },
                        "vms" : {
                           "format" : "pve-vmid-list",
                           "type" : "string",
                           "optional" : 1,
                           "description" : "List of virtual machines."
                        },
                        "storage" : {
                           "format" : "pve-storage-id-list",
                           "type" : "string",
                           "optional" : 1,
                           "description" : "List of storage IDs."
                        },
                        "poolid" : {
                           "format" : "pve-poolid",
                           "type" : "string"
                        }
                     }
                  },
                  "permissions" : {
                     "check" : [
                        "perm",
                        "/pool/{poolid}",
                        [
                           "Pool.Allocate"
                        ]
                     ],
                     "description" : "You also need the right to modify permissions on any object you add/delete."
                  },
                  "returns" : {
                     "type" : "null"
                  },
                  "name" : "update_pool",
                  "protected" : 1,
                  "method" : "PUT",
                  "description" : "Update pool data."
               }
            },
            "text" : "{poolid}",
            "path" : "/pools/{poolid}",
            "leaf" : 1
         }
      ],
      "path" : "/pools",
      "leaf" : 0
   },
   {
      "info" : {
         "GET" : {
            "parameters" : {
               "additionalProperties" : 0
            },
            "permissions" : {
               "user" : "all"
            },
            "returns" : {
               "type" : "object",
               "properties" : {
                  "version" : {
                     "type" : "string"
                  },
                  "repoid" : {
                     "type" : "string"
                  },
                  "release" : {
                     "type" : "string"
                  }
               }
            },
            "name" : "version",
            "method" : "GET",
            "description" : "API version details"
         }
      },
      "text" : "version",
      "path" : "/version",
      "leaf" : 1
   }
]

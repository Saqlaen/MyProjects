# My Project's

 we are using the following pattern for all our projects [ these pattern's have not been followed in 2022 project's ]

```yaml
Project
│
├── 2022
│   ├── Documentation
│   ├── Designs
│   ├── SourceCode
│   └──  Resources
│
├── 2023
│   ├── Documentation
│   ├── Designs
│   ├── SourceCode
│   └──  Resources
│
└── Archive
    ├── ProjectArchive_2020
    ├── ProjectArchive_2021
    └── ... 
```

## CLI's

1. we have a file-orgy commad which we can use to list out the dir's or file's in terminal type `file-orgy help`\

## TO-DO's

create one more command called generate-template

-> if you give a path it should create the following dir's and their respective file's
```   
   ├── Documentation
   ├── Designs
   ├── SourceCode
   └──  Resources
```

-> if you do not pass a path take that cwd and prompt for a name for your project and create these dir's and file's
    use that as a project name
```   
   ├── Documentation
   ├── Designs
   ├── SourceCode
   └──  Resources
```

---
title: Organization | CREATE
sidebar_label: 'Organization | CREATE'
sidebar_position: 3
---

# Organization | CREATE

Endpoint path:
```curl
https://localhost:3004/api/create
```

| Parameter name | Parameter type  | Required  |
|---|---|---|
| id  | int |yes |
| name  | string |no |


Endpoint parameter json:
```yaml
{
      'name':'Org1'
      'id': 1
}
```

Expected output:
```yaml
{
      id:1
}
```


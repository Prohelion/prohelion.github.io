---
title: How to Write Your First Script
---

# How to Write Your First Script

Create your first Profinity script to automate tasks and interact with your CAN bus system.

## Prerequisites

- Profinity V2 installed and running
- An active profile with components configured
- Basic understanding of JavaScript, Python, or C#
- Scripting enabled in Profinity configuration

## Steps

### Step 1: Enable Scripting

1. Navigate to **ADMIN** → **System Configuration**
2. Find **Scripting** section
3. Enable **Enable Scripting**
4. Click **Save**

### Step 2: Choose Your Script Type

For your first script, use **Run Script**:
- **Run Scripts** - Execute on-demand or on a schedule
- **Receive Scripts** - Triggered when CAN messages are received
- **Service Scripts** - Long-running background services

### Step 3: Open the Script Editor

1. Navigate to **ADMIN** → **Scripts**
2. Click **New Script** or **Add Script**
3. Select **Run Script**
4. Script editor opens

### Step 4: Write Your First Script

**JavaScript Example:**
```javascript
async function main() {
    const components = await profinity.getComponents();
    for (const component of components) {
        const data = await profinity.getComponentData(component.id);
        console.log(`Component: ${component.name}`);
    }
}
main().catch(console.error);
```

**Python Example:**
```python
import profinity

def main():
    components = profinity.get_components()
    for component in components:
        data = profinity.get_component_data(component.id)
        print(f"Component: {component.name}")

if __name__ == "__main__":
    main()
```

### Step 5: Configure Script Settings

1. Set **Script Name**
2. Select **Language** (JavaScript, Python, or C#)
3. Add **Description**
4. Configure **Trigger**:
   - **On Demand** - Run manually
   - **Scheduled** - Run on schedule (cron)
   - **On Startup** - Run when Profinity starts

### Step 6: Test Your Script

1. Click **Run** or **Test**
2. Check console output for results
3. Review error messages
4. Fix issues and test again

### Step 7: Save and Deploy

1. Click **Save** to save your script
2. Script appears in your scripts list
3. Run on demand or according to schedule

## Next Steps: More Advanced Scripts

### Reading Component Data

```javascript
// Read specific component data
const bmuData = await profinity.getComponentData('Prohelion BMU');
const voltage = bmuData.PackMeasurement.PackVoltage;
console.log(`Battery Voltage: ${voltage}V`);
```

### Sending CAN Messages

```javascript
// Send a CAN message
await profinity.canBus.sendMessage({
    id: 0x123,
    data: [0x01, 0x02, 0x03, 0x04],
    extended: false
});
```

### Accessing System State

```javascript
// Access system properties
const activeProfile = await profinity.profiles.getActive();
const systemInfo = await profinity.system.getInfo();
```

## Tips

- **Start Simple**: Begin with basic scripts that read data
- **Use Console Logging**: Use `console.log()` to debug your scripts
- **Test Incrementally**: Test small parts of your script as you build it
- **Review Examples**: Look at example scripts in the documentation

## Troubleshooting

- **Script Not Running**: Check that scripting is enabled
- **No Data Available**: Ensure components are active and receiving data
- **Syntax Errors**: Validate your code syntax before running
- **Permission Issues**: Verify your script has necessary permissions

## Related Documentation

- [Scripting Overview](../Extending_Profinity/Scripting/index.md) - Complete scripting guide
- [Supported Languages](../Extending_Profinity/Scripting/Supported_Languages/index.md) - Language-specific documentation
- [Script Types](../Extending_Profinity/Scripting/Script_Types/index.md) - Different script types explained
- [Script Operations](../Extending_Profinity/Scripting/Script_Operations/index.md) - Available operations and APIs

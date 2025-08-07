namespace CryptoEat.Modules;

public static class TaskBar
{
    public static void SetEmpty()
    {
        // TODO: Remove TaskBarProgress dependency - not needed for web interface
        // TaskbarProgress.SetState(TaskbarStates.NoProgress);
    }

    public static void SetProgress(int value, int max)
    {
        // TODO: Remove TaskBarProgress dependency - progress will be shown in web interface
        // TaskbarProgress.SetValue(value, max);
    }

    public static void SetError()
    {
        // TODO: Remove TaskBarProgress dependency - errors will be shown in web interface
        // TaskbarProgress.SetState(TaskbarStates.Error);
    }
}
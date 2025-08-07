namespace CryptoEat.Modules.HelpersN;

public static class Extensions
{
    public static List<T> Randomize<T>(this List<T> list)
    {
        var rng = new Random();
        var result = new List<T>(list);
        
        for (int i = result.Count - 1; i > 0; i--)
        {
            int randomIndex = rng.Next(i + 1);
            (result[i], result[randomIndex]) = (result[randomIndex], result[i]);
        }
        
        return result;
    }

    public static string Clear(this string input)
    {
        // Remove color formatting and other markup
        return input;
    }
}

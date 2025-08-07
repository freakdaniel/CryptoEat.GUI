using System.Collections;

namespace CryptoEat.Modules.HelpersN;

public class EnumeratorWrapper<T> : IEnumerable<T>
{
    private readonly List<T> _items;
    private int _currentIndex = 0;

    public EnumeratorWrapper(List<T> items)
    {
        _items = items ?? new List<T>();
    }

    public T GetNext()
    {
        if (_items.Count == 0)
            throw new InvalidOperationException("No items available");

        var item = _items[_currentIndex];
        _currentIndex = (_currentIndex + 1) % _items.Count;
        return item;
    }

    public int Count => _items.Count;

    public IEnumerator<T> GetEnumerator()
    {
        return _items.GetEnumerator();
    }

    IEnumerator IEnumerable.GetEnumerator()
    {
        return GetEnumerator();
    }
}
